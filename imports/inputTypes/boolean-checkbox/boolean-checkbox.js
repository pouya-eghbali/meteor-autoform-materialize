/**
 * @see https://materializecss.com/checkboxes.html
 **/

// imports
import { Template } from 'meteor/templating';
import './boolean-checkbox.html';
import { attsToggleInvalidClass } from './../../utilities/attsToggleInvalidClass.js';

// helpers
Template.afCheckbox_materialize.helpers({
 atts: attsToggleInvalidClass
});
