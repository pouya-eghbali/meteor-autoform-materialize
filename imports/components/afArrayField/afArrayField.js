import { Template } from "meteor/templating";
import "./afArrayField.html";
import { Sortable } from "@shopify/draggable";
import { _ } from "meteor/underscore";
import "./afArrayField.css";

const move = function(arr, from, to) {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
};

const repackFields = (instance, fieldName, formId) => {
  const { newIndex, oldIndex } = instance.dragEvent;
  move(instance.oldValue, oldIndex, newIndex);
  AutoForm.setFieldValue(fieldName, instance.oldValue, formId);
};

Template.afArrayField_materialize.onRendered(() => {
  const instance = Template.instance();
  const template = this;
  const formId = AutoForm.getFormId();

  const context = AutoForm.Utility.getComponentContext(
    instance.data.atts,
    "afEachArrayItem"
  );
  const fieldName = context.atts.name;
  const safeDragClass = fieldName.replace(/\./g, "-dot-");

  // headers!

  instance.autorun(function() {
    const options = context.defs.autoform || {};
    const fieldValue = AutoForm.getFieldValue(fieldName, formId) || [];
    const defaultField = Object.keys(fieldValue[0] || {}).sort((a, b) =>
      a > b ? 1 : -1
    )[0];
    const isArrayOrObject =
      Array.isArray(fieldValue[0]) || typeof fieldValue[0] == "object";
    const headerFieldName = options.arrayHeaderField || defaultField;
    const defaultHeader =
      options.arrayHeaderDefault || "Click here to edit this item";
    const items = template.$(`.array-header-${safeDragClass}`);
    const headerMode = options.arrayHeaderMode || "text";

    items.each(function(index) {
      const item = template.$(this);

      let header;

      if (fieldValue[index]) {
        if (!isArrayOrObject || headerFieldName == "$") {
          header = fieldValue[index];
        } else {
          header = fieldValue[index][headerFieldName];
        }
      }

      if (
        context.defs.autoform &&
        context.defs.autoform.arrayHeaderFieldCallback
      ) {
        header = context.defs.autoform.arrayHeaderFieldCallback(header);
      }

      if (header == undefined || header == "") {
        header = defaultHeader;
      }

      headerMode == "text"
        ? item.find(".afArrayHeader").text(header)
        : item.find(".afArrayHeader").html(header);
    });
  });

  // initialize the collapsible

  const options = {};
  const afOptions = context.defs.autoform || {};

  if (afOptions.collapsible == false) return;

  options.accordion = afOptions.accordion ? true : false;

  const elem = instance.$(".collapsible").get(0);
  const collapsible = M.Collapsible.init(elem, options);
  instance.collapsible = collapsible;

  if (afOptions.allOpen) {
    const items = template
      .$(`.draggable-item-${safeDragClass}`)
      .children(".array-header");
    for (let index = 1; index <= items.length; index++) {
      collapsible.open(index);
    }
  }

  // setup drag and drop sorting
  const sortableContainerSelector = `.draggable-container-${safeDragClass}`;
  const sortableContainer = instance.$(sortableContainerSelector).get();
  // console.log('sortable containers', sortableContainer)

  // avoid conflicts by adding safeDragClass
  const sortable = new Sortable(sortableContainer, {
    draggable: `.draggable-item-${safeDragClass}`,
    handle: `.drag-handle-${safeDragClass}`,
    appendTo: "body",
    mirror: {
      constrainDimensions: true
    },
    delay: 250
  });

  // on sorted dag event
  let isSorted = false;
  sortable.on("sortable:sorted", dragEvent => {
    isSorted = true;
    instance.dragEvent = dragEvent;
    instance.oldValue = Tracker.nonreactive(() =>
      AutoForm.getFieldValue(fieldName, formId)
    );
  });

  // on sorted dag event
  sortable.on("mirror:destroy", dragEvent => {
    // console.log('mirror:destroy:', dragEvent)
    // if the array was sorted
    if (isSorted) {
      // allow draggable to clean the DOM
      Meteor.setTimeout(() => repackFields(instance, fieldName, formId), 0);
    }
  });
});

Template.afArrayField_materialize.helpers({
  shouldRenderAddButton(atts) {
    return atts.disabled !== true;
  },
  shouldRenderRemoveButton(atts) {
    return atts.disabled !== true;
  },
  shouldRenderDragButton(atts) {
    return atts.disabled !== true;
  },
  shouldRenderEditButton(atts) {
    return atts.disabled !== true;
  },
  pack(atts, options, name) {
    return { atts, options, name };
  },
  safeDragClass(fieldName) {
    return fieldName.replace(/\./g, "-dot-");
  },
  colSize(atts) {
    return atts.size || "s12";
  },
  cardSize(atts) {
    return atts.cardSize || "s12";
  },
  isFalse(term) {
    return term === false;
  },
  isTrue(term) {
    return term === true;
  },
  getCardsContainerClass(atts) {
    return atts.cardsContainerClass || "";
  }
});

Template.afArrayField_materialize.events({
  "click .afArrayItemRemoveButton": function(event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // prevent the item from opening/closing
    instance
      .$(event.target)
      .closest(".array-header")
      .click();
    // open the modal
    instance
      .$(event.target)
      .closest(".array-header")
      .find(".afArrayItemRemoveDialog")
      .modal()
      .modal("open");
  },
  "click .noCollapsible .afArrayItemRemoveButton": function(event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // prevent the item from opening/closing
    instance
      .$(event.target)
      .closest(".array-item-buttons")
      .click();
    // open the modal
    instance
      .$(event.target)
      .closest(".array-item-buttons")
      .find(".afArrayItemRemoveDialog")
      .modal()
      .modal("open");
  },
  "click .cardMode .afArrayItemRemoveButton": function(event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // open the modal
    instance
      .$(event.target)
      .closest(".array-item-buttons")
      .find(".afArrayItemRemoveDialog")
      .modal()
      .modal("open");
  },
  "click .modal-close": function(event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // prevent the item from opening/closing
    instance
      .$(event.target)
      .closest(".array-header")
      .click();
    // close the modal
    instance
      .$(event.target)
      .closest(".array-header")
      .find(".afArrayItemRemoveDialog")
      .modal()
      .modal("close");
  },
  "click .modal-overlay": function(event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // prevent the item from opening/closing
    instance
      .$(event.target)
      .closest(".array-header")
      .click();
    // close the modal
    instance
      .$(event.target)
      .closest(".array-header")
      .find(".afArrayItemRemoveDialog")
      .modal()
      .modal("close");
  },
  "click .modal-confirm": function(event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // remove the item
    instance
      .$(event.target)
      .closest(".array-header")
      .find(".autoform-remove-item")
      .click();
  },
  "click .noCollapsible .modal-confirm": function(event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // remove the item
    instance
      .$(event.target)
      .closest(".array-item-buttons")
      .find(".autoform-remove-item")
      .click();
  },
  "click .cardMode .modal-confirm": function(event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // remove the item
    instance
      .$(event.target)
      .closest(".array-item-buttons")
      .find(".autoform-remove-item")
      .click();
  },
  "click .autoform-add-item": function(event) {
    const instance = Template.instance();

    const context = AutoForm.Utility.getComponentContext(
      instance.data.atts,
      "afEachArrayItem"
    );
    const fieldName = context.atts.name;
    const safeDragClass = fieldName.replace(/\./g, "-dot-");

    if (instance.data.atts && instance.data.atts.allOpen) {
      setTimeout(() => {
        const items = instance
          .$(`.draggable-item-${safeDragClass}`)
          .children(".array-header");
        for (let index = 1; index <= items.length; index++) {
          instance.collapsible.open(index);
        }
      }, 0);
    }
  }
});
