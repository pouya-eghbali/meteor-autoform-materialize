// impoers
import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./select-multiple.html";
import { optionAtts } from "../../utilities/optionAtts";
import { attsToggleInvalidClass } from "../../utilities/attsToggleInvalidClass";
import { initializeSelect } from "../../utilities/initializeSelect";
import "./search.css";

// worker functions
function isEmptySelect(value) {
  const valueIsEmptyArray =
    _.isArray(value) && value.length === 1 && _.isEmpty(_.first(value));
  if (_.isEmpty(value) || valueIsEmptyArray) {
    return true;
  } else {
    return false;
  }
}

function placeholder(data) {
  if (data.atts.firstOption) {
    return data.atts.firstOption;
  } else if (data.atts.placeholder) {
    return data.atts.placeholder;
  } else return undefined;
}

function hasPlaceholder(data) {
  return data.atts.firstOption || data.atts.placeholder ? true : false;
}

function createItems(data) {
  const items = [];
  // get selected values
  let selectedValues = data.value;

  // normalise selected values (for multiple select)
  if (!_.isArray(selectedValues)) {
    selectedValues = [selectedValues];
  }
  // console.log('selectedValues', selectedValues)

  // if there is a placeholder (or first option)
  if (hasPlaceholder(data)) {
    // define first option
    const firstOption = {
      htmlAtts: {},
      label: placeholder(data),
      value: "",
      disabled: true,
      selected: false,
      _id: "AUTOFORM_EMPTY_FIRST_OPTION",
    };

    // add first item
    items.push(firstOption);
  }

  // for each item
  for (let item of data.selectOptions) {
    // if item is selected in old values
    if (_.contains(selectedValues, item.value)) {
      // push selected item
      items.push(_.extend(item, { selected: true }));
    }

    // else
    else {
      // push item
      items.push(item);
    }
  }

  // return items
  // console.log('created items', items)
  return items;
}

const throttle = (fn, limit = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), limit);
  };
};

// on created
Template.afSelectMultipleLazy_materialize.onCreated(() => {
  const instance = Template.instance();
  // init items
  instance.autorun(function () {
    const data = Template.currentData();
    instance.items = instance.items || new ReactiveVar();
    instance.items.set(createItems(data));
  });
});

// on rendered
Template.afSelectMultipleLazy_materialize.onRendered(() => {
  const instance = Template.instance();
  const { id } = instance.data.atts;
  const { materialize = {} } = instance.data;
  const { selectOptions = {} } =
    typeof materialize == "function" ? materialize() : materialize;
  const { dropdownOptions = {} } = selectOptions;

  const materializeSelect = () => {
    // get select element, query
    const selectQuery = $(`#${id}`);
    const selectElement = selectQuery.get(0);

    // init materialize select
    if (!selectElement) return;
    instance.selectInstance = M.FormSelect.init(selectElement, {
      ...selectOptions,
      dropdownOptions: {
        ...dropdownOptions,
        closeOnClick: false,
        onOpenStart() {
          if (instance.renderAll.get()) return;
          instance.renderAll.set(true);
          Meteor.setTimeout(materializeSelect, 0);
          Meteor.setTimeout(() => instance.selectInstance.dropdown.open(), 0);
        },
        onCloseEnd() {
          instance.renderAll.set(false);
          Meteor.setTimeout(materializeSelect, 0);
        },
      },
    });
    const { data } = instance;

    // select all options

    if (data.atts.enableSelectAll) {
      const selectAllText = data.atts.selectAllText || "Select all";
      const selectNoneText = data.atts.selectNoneText || "Select none";
      const ul = $(instance.selectInstance.dropdownOptions);
      const selectAllEl = $(
        `<li class="afSelectAllOption">
            <span><label>${selectAllText}</label></span></li>`
      );
      ul.prepend(selectAllEl);
      selectAllEl.click((event) => {
        const selectAll = selectAllEl.find("label").text() == selectAllText;
        selectAllEl
          .find("label")
          .text(selectAll ? selectNoneText : selectAllText);
        ul.children("li")
          .filter(function () {
            return $(this).find("input").prop("checked") != selectAll;
          })
          .click();
      });
    }

    // search bar

    if (data.atts.enableSearch) {
      const placeholder = data.atts.searchPlaceholder || "Search...";
      const ul = $(instance.selectInstance.dropdownOptions);
      const search = $(`<input placeholder="${placeholder}">`);
      const searchBar = $(`<div class="afSelectSearchBar"></div>`);
      const children = ul
        .children()
        .toArray()
        .map((child) => {
          return {
            el: child,
            content: child.innerText.toLowerCase(),
          };
        });
      searchBar.append(search);
      ul.prepend(searchBar);

      search.on("keydown", (event) => event.stopImmediatePropagation());
      search.on("keyup", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        children.forEach((child) => {
          const { el, content } = child;
          if (content.includes(searchTerm)) {
            el.style.display = "list-item";
          } else {
            el.style.display = "none";
          }
        });
      });
    }
  };

  materializeSelect();
});

// helpers
Template.afSelectMultipleLazy_materialize.helpers({
  atts: attsToggleInvalidClass,

  getItems() {
    const instance = Template.instance();
    const { items } = instance;
    instance.renderAll = instance.renderAll || new ReactiveVar(false);
    const renderAll = instance.renderAll.get();
    const { firstOption: label = "(Select One)" } = this.atts;
    const firstOption = { label, value: "", disabled: true };
    const allItems = items ? items.get() : [firstOption];
    if (renderAll) return allItems;
    if (!this.value || !this.value.length) return [firstOption];
    return allItems.filter((item) => this.value.includes(item.value));
  },

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
    // console.log(`optionAtts for option ${option.label}`, atts)
    return atts;
  },

  // get label for an option
  optionLabel(option) {
    return option.label;
  },
});

//add autoform input
AutoForm.addInputType("select-multiple-lazy", {
  template: "afSelectMultipleLazy_materialize",
  valueOut: function () {
    return this.val();
  },
});
