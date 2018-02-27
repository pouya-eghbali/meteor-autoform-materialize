/*jshint esversion: 6 */
import './afArrayField.html';
import dragula from 'dragula';
import { _ } from 'underscore';
import { awaitSelector } from '../../utilities/awaitSelector';

// recursive helper
const flattenField = (decendantFields, fieldName, fieldValue) => {
  // console.log('flatten: fieldName', fieldName);
  // console.log('flatten: fieldValue', fieldValue);
  const childrenKeys = _.keys(fieldValue);
  for (let childKey of childrenKeys) {
    // console.log('flatten: child key', childKey);
    const childFieldName = fieldName+'.'+childKey;
    // console.log('flatten: child field name', childFieldName);
    const child = fieldValue[childKey];
    // console.log('flatten: child object', child);
    if (!_.isObject(child) && !_.isArray(child)) {
      // console.log('flatten: child is simple, add to decendant fields');
      decendantFields.push({name: childFieldName, value: child});
    }
    else {
      // console.log('flatten: child is complex, recurse');
      flattenField(decendantFields, fieldName+'.'+childKey, child);
    }
  }
};

// recursive helper
const setElementValue = (instance, element, fieldName, value) => {
  // console.log('setElementValue: element', element);
  // console.log('setElementValue: fieldName', fieldName);
  // console.log('setElementValue: value', value);

  // recursive flatten field value to array of decendant fields
  const decendantFields = [];
  flattenField(decendantFields, fieldName, value);
  console.log('setElementValue: decendantFields', decendantFields);

  // update each decendant field value on the DOM
  for (let decendantField of decendantFields) {

    // promise to await the selector in element
    const selector = 'input[name="'+decendantField.name+'"]';
    console.log('await selector', selector);
    awaitSelector(selector, element, 250)

        // then
        .then((elements) => {
          const el = elements[0];
          console.log('resolved element', el);

          // set the value of the input
          qInput = instance.$(el);
          qInput.val(decendantField.value);
          console.log('set input', qInput.attr('name'), 'value to',
              decendantField.value);
        })

        // catch
        .catch(error => {
          console.error(error);
        });
  }

};

const isArrayOfObjects = (schema, fieldName) => {
  // console.log('field name', fieldName);
  const fieldDefinition = schema.getDefinition(fieldName);
  // console.log('field definition', fieldDefinition);
  const childDefinition = schema.getDefinition(fieldName+'.$');
  // console.log('child definition', childDefinition);
  let result = false;
  for (let t of childDefinition.type) {
    if (t.type === Object) {
      result = true;
      break;
    }
  }
  // console.log('child is object', result);
  return result;
};

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

const moveFieldInArray = (instance, formId, fieldName, schema, fromIndex, toIndex) => {
  const info = AutoForm.arrayTracker.info;
  const field = info[formId][fieldName];
  const array = field.array;
  const fieldValue = AutoForm.getFieldValue(fieldName, formId);

  // define new array to delete than add
  const repack = [];

  // sort indexes
  const firstIndex = fromIndex>toIndex?fromIndex:toIndex;
  const secondIndex = fromIndex<toIndex?fromIndex:toIndex;

  // pack field being moved
  repack.push(_.clone(array[firstIndex]));

  // pack field being replaced
  repack.push(_.clone(array[secondIndex]));

  // for each item after toIndex
  for (let i = toIndex+1; i < array.length; i++) {

    // if item is not fromIndex
    if (i !== secondIndex) {

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
    r.newName = c.name;

    // cleanup repack item
    delete r.index;
    delete r.minCount;
    delete r.maxCount;
    delete r.formId;
    delete r.current;

    // push array item to array tracker
    array.push(c);
  }
  console.log('move: array:', array);
  console.log('move: repack:', repack);

  // mark the array as changed
  field.deps.changed();

  // for each repacked value
  for (let item of repack) {
    console.log('move: repack item under new name:', item.name);

    // promise to find new array item
    const rootNode = instance.$('.dragContainer').get()[0];
    console.log('await', item.newName, 'in', rootNode);
    awaitSelector("[name='"+item.newName+"']", rootNode, 250)

        // then
        .then((elements) => {
          const element = elements[0];
          console.log('resolved element:', element);

          // recursively set value for new array item
          setElementValue(instance, element, item.newName, item.value);
        })

        // catch
        .catch(error => {
          console.error(error);
        });
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

     // if element is an object
     let elementName;
     if (isArrayOfObjects(instance.schema, instance.fieldName)) {

       // get the card name attribute
       elementName = instance.$(element).find('.card-panel').attr('name');
     }
     // else - element is literal or array
     else {
       // get the input name attribute
       elementName = instance.$(element).find('input').attr('name');
     }
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
     moveFieldInArray(instance, instance.formId, instance.fieldName, instance.schema,
        fromIndex, toIndex);
   }
  });
});

// Template.afArrayField_materialize.events({
// });
