/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './select-multiple.html';
import { optionAtts } from '../../utilities/optionAtts';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';
import { initializeSelect } from '../../utilities/initializeSelect';

const isEmptySelect = value => {
  // console.log(`Test for empty value:`, _.clone(value));
  const valueIsEmptyArray = _.isArray(value) &&
      (value.length === 1) && (_.isEmpty(_.first(value)));
  if (_.isEmpty(value) || valueIsEmptyArray) {
    return true;
  }
  else {
    return false;
  }
};

const placeholder = (data) => {
  if (data.firstOption) {
    return data.atts.firstOption;
  }
  else if (data.atts.placeholder) {
    return data.atts.placeholder;
  }
  else return undefined;
};

const isPlaceholderValue = (data) => {
  return placeholder(data) && isEmptySelect(data.value);
};

Template.afSelectMultiple_materialize.onCreated(() => {
  const instance = Template.instance();
  // console.log(`instance data:`, _.clone(instance.data));

  // if there is a placeholder and the value is empty
  if (isPlaceholderValue(instance.data)) {
    // console.log(`there is a placeholder and the value is empty`);

    // set the autoform value to the placeholder
  }
});

Template.afSelectMultiple_materialize.onRendered(() => {
  const instance = Template.instance();

  const select = instance.$('select');
  select.material_select();

  // console.log(`select was rendered and initialized`);

  // // for each selected option in value
  // for (let value of instance.data.value) {
  //   console.log(`init select option ${value}`);
  //
  //   // select option on the dom, but this is already done by optionAttr helper!
  //   $(`#${instance.data.atts.id} option[value="${value}"]`)
  //       .attr('selected', true);
  // }

  // // react when instance data changes
  // instance.autorun(() => {
  //   const data = Template.currentData();
  //
  //   // if the value is empty and there is a placeholder
  //   if (data && isEmptySelect(data.value)) {
  //     console.log(`${data.name} is empty`);
  //
  //     // set the placeholder of the materialize input
  //   }
  // });

});

Template.afSelectMultiple_materialize.helpers({
  atts: attsToggleInvalidClass,
  optionAtts(option) {
    const atts = {value: option.value};
    if (option.selected) {atts.selected = '';}
    return atts;
  },
  firstValueSelected() {
    const instance = Template.instance();
    return isPlaceholderValue(instance.data);
  }
});
