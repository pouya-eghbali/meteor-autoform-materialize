import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { _ } from "meteor/underscore";
import { attsToggleInvalidClass } from "../../utilities/attsToggleInvalidClass";
// import '../../utilities/jqueryAttributeChangePlugin'
import "./select.html";
import "./search.css";

function throttle(fn, limit) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      fn(...args);
    }, limit);
  };
}

// on template rendered
Template.afSelect_materialize.onRendered(() => {
  const instance = Template.instance();

  // get select element, query
  const selectQuery = instance.$("select");
  const selectElement = selectQuery.get(0);

  instance.$("select").change(function() {
    instance.selectInstance = M.FormSelect.init(selectElement);
  });

  // react when template data changes
  let oldItems;
  const onItemsChanged = data => {
    // if items changed
    if (!_.isEqual(oldItems, data.items)) {
      // console.log('items changed', oldItems, data.items)

      // assign new items to old items
      oldItems = _.clone(data.items);

      // if select instance exists
      let selectedValues;
      if (instance.selectInstance) {
        // get selected values
        selectedValues = AutoForm.getFieldValue(
          data.atts.name,
          null,
          null,
          null,
          false
        );

        // normalise selected values (for multiple select)
        if (!_.isArray(selectedValues)) {
          selectedValues = [selectedValues];
        }
        // console.log('old selectedValues', selectedValues)

        // select previous selected values in new items
        data.items = _.map(data.items, item => {
          return _.contains(selectedValues, item.value)
            ? _.extend(item, { selected: true })
            : item;
        });
        // console.log('data.items', data.items)

        // destory previous instance of materialize select
        instance.selectInstance.destroy();
      }

      // remove all children of the select element
      selectQuery.empty();

      // render items template inside select element
      Blaze.renderWithData(
        Template.afSelect_materialize_items,
        data,
        selectElement
      );

      // init materialize select
      instance.selectInstance = M.FormSelect.init(selectElement);

      // search bar

      function ensureSearchBar() {
        if (
          !$(instance.selectInstance.dropdownOptions).find(".afSelectSearchBar")
            .length
        ) {
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
              return { el: child, content: child.innerText.toLowerCase() };
            });
          searchBar.append(search);
          ul.prepend(searchBar);

          if (
            instance.selectInstance.dropdown &&
            instance.selectInstance.dropdown.options
          ) {
            instance.selectInstance.dropdown.options.closeOnClick = false;
            search.on("keydown", event => event.stopImmediatePropagation());
            instance.selectInstance.dropdown.options.onCloseEnd = ensureSearchBar;
          }

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
    }
  };
  const onItemsChangedThrottled = throttle(onItemsChanged, 100);
  instance.autorun(() => {
    const data = Template.currentData();
    // console.log('select template data', data)
    onItemsChangedThrottled(data);
  });
});

// helpers
Template.afSelect_materialize.helpers({
  atts: attsToggleInvalidClass
});

// on destroyed
Template.afSelect_materialize.onDestroyed(() => {
  const instance = Template.instance();

  // destory instance of materialize select
  if (instance.selectInstance) {
    instance.selectInstance.destroy();
  }
});

// helpers
Template.afSelect_materialize_items.helpers({
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
    if (option.atts && option.atts.htmlAttributes) {
      _.extend(atts, option.atts.htmlAttributes);
    }
    // console.log(`optionAtts for option ${option.label}`, atts)
    return atts;
  },

  // get label for an option
  optionLabel(option) {
    if (option._id === "AUTOFORM_EMPTY_FIRST_OPTION") {
      if (option.atts.placeholder) {
        return option.atts.placeholder;
      }
      if (option.atts.firstOption) {
        return option.atts.firstOption;
      }
    }
    return option.label;
  }
});
