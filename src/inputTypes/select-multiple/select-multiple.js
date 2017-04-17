/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './select-multiple.html';
import { optionAtts } from '../../utilities/optionAtts';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afSelectMultiple_materialize.onRendered(function() {
  const instance = Template.instance();

  //init select
  $('select').material_select();

  //get select wrapper
  const select = $('#'+instance.data.atts.id);
  const selectWrapper = select.parent();

  //if no value is defined and firstOption is defined
  if ((instance.data.value.length===0) && (instance.data.atts.firstOption)) {

    //initialise value
    instance.value.set(instance.data.atts.firstOption);
    const input = selectWrapper.find('input.select-dropdown:first');
    input.attr('value', instance.data.atts.firstOption);
  }
});

Template.afSelectMultiple_materialize.helpers({
  optionAtts: optionAtts,
  atts: attsToggleInvalidClass,
  firstValueSelected: () => {
    const instance = Template.instance();
    if ((instance.value.length===0) && (instance.data.atts.firstOption)) {
      return true;
    }
    return false;
  }
});
