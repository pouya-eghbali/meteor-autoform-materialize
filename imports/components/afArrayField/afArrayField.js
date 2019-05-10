import { Template } from 'meteor/templating'
import './afArrayField.html'
import { Sortable } from '@shopify/draggable'
import { _ } from 'meteor/underscore'

const repackFields = (instance, fieldName, safeDragClass) => {  

  const container = instance.$(`.draggable-container-${safeDragClass}`)  

  // get draggable items that are children of the container
  const draggableItems = container.children(`.draggable-item-${safeDragClass}`).get();

  // loop through draggable items and change all field names / schema-key

  draggableItems.forEach((draggableItem, index) => {

    draggableItem = $(draggableItem);
    const allSchemaKeys = draggableItem.find('[data-schema-key]');
    const allNames = draggableItem.find('[name]');

    // change schema-keys:

    allSchemaKeys.each(function () {
      const schemaKey = $(this)
      let key = schemaKey.attr('data-schema-key')
      if (key == fieldName) {
        return
      }
      if (key.startsWith(fieldName)) {
        // remove fieldName and the dot after
        key = key.slice(fieldName.length + 1);
        // remove leading number and dot after
        key = key.replace(/^\d+\./, '');
        // add current index and field name
        key = `${fieldName}.${index}.${key}`
        // replace data-schema-key
        schemaKey.attr('data-schema-key', key)
      }
    })

    // change names:

    allNames.each(function () {
      const field = $(this)
      let name = field.attr('name')
      if (name == fieldName) {
        return
      }
      if (name.startsWith(fieldName)) {
        // remove fieldName and the dot after
        name = name.slice(fieldName.length + 1);
        // remove leading number and dot after
        name = name.replace(/^\d+\./, '');
        // add current index and field name
        name = `${fieldName}.${index}.${name}`
        // replace data-schema-key
        field.attr('name', name)
      }
    })
    
  })
  
}

Template.afArrayField_materialize.onRendered(() => {  

  const instance = Template.instance()
  const template = this;

  const formId = template.$('form').attr('id');
  
  const context = AutoForm.Utility.getComponentContext(instance.data.atts,
    "afEachArrayItem")
  const fieldName = context.atts.name
  const safeDragClass = fieldName.replace(/\./g, '-dot-')

  // headers!

  instance.autorun(function () {
    const fieldValue = AutoForm.getFieldValue(fieldName, formId);    
    if (!fieldValue || !fieldValue.length) {      
      return
    }
    const defaultField = Object.keys(fieldValue[0]).sort((a, b) => a > b ? 1 : -1)[0];
    const items = template.$(`.draggable-item-${safeDragClass}`).children('.collapsible-header');
    
    items.each(function (index) {
      const item = template.$(this);
      let field = item.find('[data-afArrayHeaderField]').attr('data-afArrayHeaderField');
      if (field == 'null') {
        field = defaultField;
      }
      if (!fieldValue[index]) {
        return
      }
      item.find('[data-afArrayHeaderField]').text(fieldValue[index][field]);
    });
  })

  // initialize the collapsible

  instance.$('.collapsible').collapsible();

  // setup drag and drop sorting
  const sortableContainerSelector = `.draggable-container-${safeDragClass}`
  const sortableContainer = instance.$(sortableContainerSelector).get()
  // console.log('sortable containers', sortableContainer)  

  // avoid conflicts by adding safeDragClass
  const sortable = new Sortable(sortableContainer, {
    draggable: `.draggable-item-${safeDragClass}`,
    handle: `.drag-handle-${safeDragClass}`,
    appendTo: 'body',
    mirror: {
      constrainDimensions: true,
    },
    delay: 250
  })

  // on sorted dag event
  let isSorted = false
  sortable.on('sortable:sorted', (dragEvent) => {
    isSorted = true
  })

  // on sorted dag event
  sortable.on('mirror:destroy', (dragEvent) => {
    // console.log('mirror:destroy:', dragEvent)

    // if the array was sorted
    if (isSorted) {   

      // allow draggable to clean the DOM
      Meteor.setTimeout(() => {
        repackFields(template, fieldName, safeDragClass)
      }, 0)
    }
  })
})

Template.afArrayField_materialize.helpers({
  pack(atts, options, name) {
    return { atts, options, name }
  },
  safeDragClass(fieldName) {
    return fieldName.replace(/\./g, '-dot-');
  },
})

Template.afArrayField_materialize.events({
  'click .afArrayItemRemoveButton': function (event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // prevent the item from opening/closing
    instance.$(event.target).closest('.collapsible-header').click();
    // open the modal
    instance.$(event.target).closest('.collapsible-header').find('.afArrayItemRemoveDialog').modal().modal('open');
  },
  'click .modal-close': function (event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // prevent the item from opening/closing
    instance.$(event.target).closest('.collapsible-header').click();
    // close the modal
    instance.$(event.target).closest('.collapsible-header').find('.afArrayItemRemoveDialog').modal().modal('close');
  },
  'click .modal-overlay': function (event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // prevent the item from opening/closing
    instance.$(event.target).closest('.collapsible-header').click();
    // close the modal
    instance.$(event.target).closest('.collapsible-header').find('.afArrayItemRemoveDialog').modal().modal('close');
  },
  'click .modal-confirm': function (event) {
    event.preventDefault();
    event.stopPropagation();
    const instance = Template.instance();
    // prevent the item from opening/closing
    instance.$(event.target).closest('.collapsible-header').click();
    // remove the item
    instance.$(event.target).closest('.collapsible-header').find('.autoform-remove-item').click();
  }
})