/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './boolean-checkbox.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afCheckbox_materialize.helpers({
 atts: attsToggleInvalidClass
});
