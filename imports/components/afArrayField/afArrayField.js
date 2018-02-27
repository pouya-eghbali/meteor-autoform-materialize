/*jshint esversion: 6 */
import './afArrayField.html';
import dragula from 'dragula';
import { _ } from 'underscore';

const compArray = array => {
  return _.map(array, item => {
    const result = {
      name: item.name,
      index: item.index
    };
    if (!_.isUndefined(array.removed)) {result.removed = array.removed;}
    if (!_.isUndefined(array.value)) {result.value = array.value;}
    return result;
  });
};

const moveFieldInArray = (formId, fieldName, schema, fromIndex, toIndex) => {
  const info = AutoForm.arrayTracker.info;
  const field = info[formId][fieldName];
  const array = field.array;
  const fieldValue = AutoForm.getFieldValue(fieldName, formId);

  // define new array to delete than add
  const repack = [];

  // pack field being moved
  repack.push(_.clone(array[fromIndex]));

  // pack field being replaced
  repack.push(_.clone(array[toIndex]));

  // for each item after toIndex
  for (let i = toIndex+1; i < array.length; i++) {

    // if item is not fromIndex
    if (i !== fromIndex) {

      // pack remainder item
      repack.push(_.clone(array[i]));
    }
  }

  // for every item being repacked
  for (let i = 0; i < repack.length; i++) {

    // get the array item to repack
    const r = repack[i];

    // assign the array item value
    r.value = fieldValue[r.index];

    // clone the item to repack
    const c = _.clone(r);

    // mark the original item in array tracker as removed
    array[r.index].removed = true;

    // rework clone item index and name
    c.index = array.length;
    c.name = c.arrayFieldName+'.'+c.index;
    r.newIndex = c.index;

    // push array item to array tracker
    array.push(c);
  }
  console.log('move: array', array);
  console.log('move: repack', repack);

  // mark the array as changed
  field.deps.changed();

  // for each repacked value
  for(let r of repack) {

    // set the value of the new field

  }
};

Template.afArrayField_materialize.onCreated(() => {
  const instance = Template.instance();
});

Template.afArrayField_materialize.onRendered(() => {
  const instance = Template.instance();

  const context = AutoForm.Utility.getComponentContext(instance.data.atts, "afEachArrayItem");
  instance.formId = AutoForm.getFormId();
  console.log('Form Id:', instance.formId);
  instance.form = AutoForm.getCurrentDataForForm(instance.formId);
  console.log('Form:', instance.form);
  instance.schema = AutoForm.getFormSchema(instance.formId);
  console.log('Schema:', instance.schema);
  instance.fieldName = context.atts.name;
  console.log('Field Name:', instance.fieldName);

  const array = AutoForm.arrayTracker.getField(instance.formId, instance.fieldName);
  console.log('Initial array:', _.pluck(array, 'name'));

  const dragContainer = instance.$('.dragContainer').get()[0];
  instance.drake = dragula([dragContainer], {
    moves(el, container, handle) {
      return handle.classList.contains('dragHandle');
    },
    accepts(el, target, source, sibling) {
      return sibling===null?true:!sibling.classList.contains('dragHeader');
    }
  });
  instance.drake.on('drop', (element, target, source, sibling) => {
   console.log('Dropped element', element, 'before sibling', sibling);

   // if element is dragged to the end
   if (sibling === null) {
     // remove the element from the array tracker
     // AutoForm.arrayTracker.addOneToField(formId, field, ss, overrideMinCount, overrideMaxCount);
   }
   else {

     // get element data-schema-key
     const elementName = instance.$(element).find('input').attr('name');
     console.log('Element Name:', elementName);

     // get array from array tracker
     const array = AutoForm.arrayTracker.getField(instance.formId, instance.fieldName);
     console.log('AutoForm array:', _.pluck(array, 'name'));

     // find the move from and move to index of element
     const fromIndex = _.findIndex(array, (el) => {
       return el.name === elementName;
     });
     const toIndex = instance.$(target).children().index(element)-1;
     console.log('Move element from index',fromIndex,'to',toIndex);

     // move the element in the array tracker
     moveFieldInArray(instance.formId, instance.fieldName, instance.schema,
        fromIndex, toIndex);
   }
  });
});

// Template.afArrayField_materialize.events({
// });
