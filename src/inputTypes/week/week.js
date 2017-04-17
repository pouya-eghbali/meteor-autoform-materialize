/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './week.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afInputWeek_materialize.helpers({
  atts: attsToggleInvalidClass
});
