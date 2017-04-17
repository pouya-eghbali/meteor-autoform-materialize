/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './boolean-select.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afBooleanSelect_materialize.helpers({
  atts: attsToggleInvalidClass
});

Template.afBooleanSelect_materialize.helpers({
  optionAtts: Utility.optionAtts
});

Template.afBooleanSelect_materialize.onRendered(Utility.initializeSelect);
