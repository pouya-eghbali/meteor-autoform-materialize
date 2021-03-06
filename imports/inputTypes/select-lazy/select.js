import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { _ } from "meteor/underscore";
import { attsToggleInvalidClass } from "../../utilities/attsToggleInvalidClass";
// import '../../utilities/jqueryAttributeChangePlugin'
import "./select.html";
import "./search.css";

// on template rendered
Template.afSelectLazy_materialize.onRendered(() => {
  const instance = Template.instance();
  instance.selected = instance.selected || new ReactiveVar(null);
  const { id } = instance.data.atts;
  const { materialize = {} } = instance.data;
  const { selectOptions = {} } =
    typeof materialize == "function" ? materialize() : materialize;
  const { dropdownOptions = {} } = selectOptions;

  const materializeSelect = () => {
    // get select element, query
    const selectQuery = $(`#${id}`);
    const selectElement = selectQuery.get(0);

    if (!selectElement) return;
    instance.selectInstance = M.FormSelect.init(selectElement, {
      ...selectOptions,
      dropdownOptions: {
        ...dropdownOptions,
        onOpenStart() {
          if (instance.renderAll.get()) return;
          instance.renderAll.set(true);
          Meteor.setTimeout(materializeSelect, 0);
          Meteor.setTimeout(() => instance.selectInstance.dropdown.open(), 0);
        },
        onCloseEnd() {
          Meteor.setTimeout(() => {
            instance.selected.set(selectElement.value);
            instance.renderAll.set(false);
            Meteor.setTimeout(materializeSelect, 0);
          }, 0);
        },
      },
    });
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
          .map((child) => {
            return {
              el: child,
              content: child.innerText.toLowerCase(),
            };
          });
        searchBar.append(search);
        ul.prepend(searchBar);

        $("body").click(function (e) {
          const { target } = e;
          const { M_Dropdown = {} } = target;
          if (
            M_Dropdown.id != instance.selectInstance.dropdown.id &&
            !target.closest(`#${instance.selectInstance.dropdown.id}`)
          )
            instance.selectInstance.dropdown.close();
        });

        if (
          instance.selectInstance.dropdown &&
          instance.selectInstance.dropdown.options
        ) {
          instance.selectInstance.dropdown.options.closeOnClick = false;
          instance.selectInstance.dropdown.options.onCloseEnd = ensureSearchBar;
          ul.children("li").on("click", (event) => {
            instance.selectInstance.dropdown.close();
          });
        }

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
    }

    maybeMakeSearchBar();
  };

  materializeSelect();
});

// helpers
Template.afSelectLazy_materialize.helpers({
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
  },

  // get items
  getItems() {
    const instance = Template.instance();
    instance.selected = instance.selected || new ReactiveVar(null);
    instance.renderAll = instance.renderAll || new ReactiveVar(false);
    const selected = instance.selected.get();
    const currValue =
      selected == null ? AutoForm.getFieldValue(instance.data.name) : selected;
    const value = currValue != undefined ? currValue : this.value;
    const renderAll = instance.renderAll.get();
    const { firstOption: label = "(Select One)" } = this.atts;
    const firstOption = { label, value: "" };
    if (renderAll) return [firstOption, ...this.selectOptions];
    if (!value) return [firstOption];
    return this.selectOptions.filter((item) => item.value == value);
  },
});

// on destroyed
Template.afSelectLazy_materialize.onDestroyed(() => {
  const instance = Template.instance();

  // destory instance of materialize select
  if (instance.selectInstance) {
    instance.selectInstance.destroy();
  }
});

//add autoform input
AutoForm.addInputType("select-lazy", {
  template: "afSelectLazy_materialize",
  valueOut: function () {
    return this.val();
  },
});
