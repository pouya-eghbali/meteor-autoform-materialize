import { jQuery } from 'meteor/jquery'

// on document ready
$(function() {

  // extend jquery with attribute change mutation observer plugin
  (function($) {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

    $.fn.attrchange = function(callback) {
      if (MutationObserver) {
        var options = {
          subtree: false,
          attributes: true
        }

        var observer = new MutationObserver(
          function(mutations) {
            mutations.forEach(
              function(e) {
                callback.call(e.target, e.attributeName, e.target);
              }
            )
          }
        )

        return this.each(
          function() {
            observer.observe(this, options);
          }
        )
      }
    }
  })(jQuery)
})
