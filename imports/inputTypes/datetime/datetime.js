/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './datetime.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass.js';

Template.afInputDateTime_materialize.helpers({
  atts: attsToggleInvalidClass
});
