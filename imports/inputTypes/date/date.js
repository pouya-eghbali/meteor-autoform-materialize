/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './date.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass.js';

Template.afInputDate_materialize.helpers({
  atts: attsToggleInvalidClass
});
