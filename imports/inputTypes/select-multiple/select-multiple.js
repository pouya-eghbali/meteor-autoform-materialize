/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './select-multiple.html';
import { optionAtts } from '../../utilities/optionAtts';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';
import { initializeSelect } from '../../utilities/initializeSelect';

Template.afSelectMultiple_materialize.onRendered(function() {
  const instance = Template.instance();

  //get select wrapper
  const select = instance.$('#'+this.data.atts.id);
  const selectWrapper = select.parent();

  //if no value is defined and firstOption is defined
  if ((this.data.value.length===0) && (this.data.atts.firstOption)) {

    //initialise value
    this.value.set(this.data.atts.firstOption);
    const input = selectWrapper.find('input.select-dropdown:first');
    input.attr('value', this.data.atts.firstOption);
  }
});

Template.afSelectMultiple_materialize.onRendered(initializeSelect);

Template.afSelectMultiple_materialize.helpers({
  optionAtts: optionAtts,
  atts: attsToggleInvalidClass,
  firstValueSelected: function () {
    if ((this.value.length===0) && (this.data.atts.firstOption)) {
      return true;
    }
    return false;
  }
});
