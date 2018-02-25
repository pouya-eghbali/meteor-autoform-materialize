/*jshint esversion: 6 */
import './afArrayField.html';
import dragula from 'dragula';

const createLoopCtx = (formId, field, index, childKeys, overrideMinCount, overrideMaxCount) => {
  const loopCtx = {
    formId:         formId,
    arrayFieldName: field,
    name:           field + '.' + index,
    index:          index,
    minCount:       overrideMinCount,
    maxCount:       overrideMaxCount
  };

  // if this is an array of objects
  if (childKeys.length) {

    // add child key names under loopCtx.current[childName] = fullKeyName
    loopCtx.current = {};
    _.each(childKeys, function (k) {
      loopCtx.current[k] = field + '.' + index + '.' + k;
    });
  }

  return loopCtx;
};

const moveFieldAtIndex = (formId, fieldName, sourceIndex, targetIndex, schema) => {
  const info = AutoForm.arrayTracker.info;

  // if the array is not defined - do nothing
  if (!info[formId][field].array) return;

  // jf this is an array of objects
  var childKeys = [];
  if (AutoForm.Utility.getFieldDefinition(ss, field + '.$').type === Object) {

    // collect names of object props
    childKeys = schema.objectKeys(AutoForm.Utility.makeKeyGeneric(field) + '.$');
  }

  var loopCtx = createLoopCtx(formId, field, i, childKeys, overrideMinCount, overrideMaxCount);

  self.info[formId][field].array.push(loopCtx);

  info[formId][field].array[sourceIndex].removed = true;
  info[formId][field].deps.changed();

};

Template.afArrayField_materialize.onCreated(() => {
  const instance = Template.instance();
  const context = AutoForm.Utility.getComponentContext(instance.data.atts, "afEachArrayItem");
  instance.formId = AutoForm.getFormId();
  instance.fieldName = context.atts.name;
  const array = AutoForm.arrayTracker.getField(instance.formId, instance.fieldName);
  console.log('Initial array:', array);
});

Template.afArrayField_materialize.onRendered(() => {
  const instance = Template.instance();
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
   console.log('Dropped', element, 'before', sibling);


   // if element is dragged to the end
   if (sibling === null) {
     // remove the element from the array tracker
     // AutoForm.arrayTracker.addOneToField(formId, field, ss, overrideMinCount, overrideMaxCount);
   }
   else {
     console.log('Drag container:', target);
     console.log('Drag container children:', target.children);

     // get children as array
     const targetArray = Array.from(target.children);

     const array = AutoForm.arrayTracker.getField(instance.formId, instance.fieldName);
     console.log('AutoForm array:', array);

     // find the index of element in array tracker
     const elementIndex = targetArray.indexOf(element)-1;
     console.log('Element index:', elementIndex);

     // find the index of sibling in array tracker
     const siblingIndex = targetArray.indexOf(sibling)-1;
     console.log('Sibling index:', siblingIndex);
   }
  });
});

// Template.afArrayField_materialize.events({
// });
