import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { _ } from "meteor/underscore";
import { attsToggleInvalidClass } from "../../utilities/attsToggleInvalidClass";
// import '../../utilities/jqueryAttributeChangePlugin'
import "./select.html";
import "./search.css";

const throttle = (fn, limit = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), limit);
  };
};

// on template rendered
Template.afSelect_materialize.onRendered(() => {
  const instance = Template.instance();
  const { id } = instance.data.atts;

  const materializeSelect = () => {
    // get select element, query
    const selectQuery = $(`#${id}`);
    const selectElement = selectQuery.get(0);

    if (!selectElement) return;
    instance.selectInstance = M.FormSelect.init(selectElement);
    const { data } = instance;

    function ensureSearchBar() {
      const { dropdownOptions } = instance.selectInstance;
      if (!$(dropdownOptions).find(".afSelectSearchBar").length) {
        maybeMakeSearchBar();
      }
    }

    function maybeMakeSearchBar() {
      if (data.atts.enableSearch) {
        const placeholder = data.atts.searchPlaceholder || "Search...";
        const ul = $(instance.selectInstance.dropdownOptions);
        const search = $(`<input placeholder="${placeholder}">`);
        const searchBar = $(`<div class="afSelectSearchBar"></div>`);
        const children = ul
          .children()
          .toArray()
          .map(child => {
            return {
              el: child,
              content: child.innerText.toLowerCase()
            };
          });
        searchBar.append(search);
        ul.prepend(searchBar);

        if (
          instance.selectInstance.dropdown &&
          instance.selectInstance.dropdown.options
        ) {
          instance.selectInstance.dropdown.options.closeOnClick = false;
          instance.selectInstance.dropdown.options.onCloseEnd = ensureSearchBar;
          ul.children("li").on("click", event => {
            instance.selectInstance.dropdown.close();
          });
        }

        search.on("keydown", event => event.stopImmediatePropagation());
        search.on("keyup", event => {
          const searchTerm = event.target.value.toLowerCase();
          children.forEach(child => {
            const { el, content } = child;
            if (content.includes(searchTerm)) {
              el.style.display = "list-item";
            } else {
              el.style.display = "none";
            }
          });
        });
      }
    }

    maybeMakeSearchBar();
  };

  const materializeSelectThrottled = throttle(materializeSelect);

  instance.autorun(function() {
    Template.currentData();
    materializeSelectThrottled();
  });
});

// helpers
Template.afSelect_materialize.helpers({
  atts: attsToggleInvalidClass,

  // get DOM attributes for an option
  optionAtts(option) {
    const atts = { value: option.value };
    if (option.selected) {
      atts.selected = "";
    }
    if (option.disabled) {
      atts.disabled = "";
    }
    if (option.htmlAtts) {
      _.extend(atts, option.htmlAtts);
    }
    return atts;
  },

  // get label for an option
  optionLabel(option) {
    return option.label;
  }
});

// on destroyed
Template.afSelect_materialize.onDestroyed(() => {
  const instance = Template.instance();

  // destory instance of materialize select
  if (instance.selectInstance) {
    instance.selectInstance.destroy();
  }
});
