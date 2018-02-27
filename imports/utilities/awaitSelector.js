/*jshint esversion: 6 */

/**
 * Await a selector to become available on a node
 * @see https://hackernoon.com/promise-based-detection-of-element-injection-94bc12e33966
 * @param {string} selector - The CSS selector that should become available on the DOM.
 * @param {domElement} rootNode - The node within which the selector is searched for. Default document.
 * @param {number} fallbackDelay - Timeout delay in ms to use if MutationObserver is not supported. Default 250ms.
 * @returns {Promise} Resolves when selector becomes available.
 **/
export const awaitSelector = (selector, rootNode, fallbackDelay) =>
    new Promise((resolve, reject) => {

  try {
    const root = rootNode || document;
    const ObserverClass = MutationObserver || WebKitMutationObserver || null;
    const mutationObserverSupported = typeof ObserverClass === 'function';
    let observer;
    const stopWatching = () => {
      if (observer) {
        if (mutationObserverSupported) {
          observer.disconnect();
        } else {
          clearInterval(observer);
        }
        observer = null;
      }
    };
    const findAndResolveElements = () => {
      const allElements = root.querySelectorAll(selector);
      if (allElements.length === 0) return;
      const newElements = [];
      const attributeForBypassing = 'data-awaitselector-resolved';
      allElements.forEach((el, i) => {
        if (typeof el[attributeForBypassing] === 'undefined') {
          allElements[i][attributeForBypassing] = '';
          newElements.push(allElements[i]);
        }
      });
      if (newElements.length > 0) {
        stopWatching();
        resolve(newElements);
      }
    };
    if (mutationObserverSupported) {
      observer = new ObserverClass(mutationRecords => {
        const nodesWereAdded = mutationRecords.reduce((found, record) =>
            found || (record.addedNodes && record.addedNodes.length > 0),
            false);
        if (nodesWereAdded) {
          findAndResolveElements();
        }
      });
      observer.observe(root, {
        childList: true,
        subtree: true,
      });
    } else {
      observer = setInterval(findAndResolveElements, fallbackDelay || 250);
    }
    findAndResolveElements();
  }
  catch (exception) {
    reject(exception);
  }
});

/**
 * Perform a callback every time a selector is added to the root node
 * @param {function} callback - Callback to execute.
 * @param {string} selector - The CSS selector that should become available on the DOM. Default document.
 * @param {domElement} rootNode - The node within which the selector is searched for.
 * @param {number} fallbackDelay - Timeout delay in ms to use if MutationObserver is not supported. Default 250ms.
 **/
export const watchAwaitSelector = (callback, selector, rootNode, fallbackDelay) => {
  (function awaiter(continueWatching = true) {
    if (continueWatching === false) return;

    awaitSelector(selector, rootNode, fallbackDelay)
      .then(callback)
      .then(awaiter);
  }());
};
