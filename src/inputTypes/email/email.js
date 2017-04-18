/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './email.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass.js';

Template.afInputEmail_materialize.helpers({
  atts: attsToggleInvalidClass
});
