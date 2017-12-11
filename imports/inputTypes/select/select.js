/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './select.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';
import { optionAtts } from '../../utilities/optionAtts';
import { initializeSelect } from '../../utilities/initializeSelect';

Template.afSelect_materialize.helpers({
  atts: attsToggleInvalidClass,
  optionAtts: optionAtts,
  value() {
    const instance = Template.instance();
    console.log('SELECT.DATA', instance.data);
    return instance.data.value?instance.data.value:instance.data.atts.default;
  }
});

Template.afSelect_materialize.onRendered(initializeSelect);
