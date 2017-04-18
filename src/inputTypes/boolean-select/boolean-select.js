/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './boolean-select.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass.js';
import { optionAtts } from '../../utilities/optionAtts.js';
import { initializeSelect } from '../../utilities/initializeSelect.js';

Template.afBooleanSelect_materialize.helpers({
  atts: attsToggleInvalidClass
});

Template.afBooleanSelect_materialize.helpers({
  optionAtts: optionAtts
});

Template.afBooleanSelect_materialize.onRendered(initializeSelect);
