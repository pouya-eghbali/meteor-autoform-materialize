/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './color.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass.js';

Template.afInputColor_materialize.helpers({
  atts: attsToggleInvalidClass
});
