/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './select.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';
import { optionAtts } from '../../utilities/optionAtts';
import { initializeSelect } from '../../utilities/initializeSelect';

Template.afSelect_materialize.helpers({
  atts: attsToggleInvalidClass
});
Template.afSelect_materialize.helpers({
  optionAtts: optionAtts
});

Template.afSelect_materialize.onRendered(initializeSelect);
