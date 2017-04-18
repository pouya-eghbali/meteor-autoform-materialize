/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './datetime-local.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass.js';

Template.afInputDateTimeLocal_materialize.helpers({
  atts: attsToggleInvalidClass
});
