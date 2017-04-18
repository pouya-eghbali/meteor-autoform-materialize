/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './number.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afInputNumber_materialize.helpers({
  atts: attsToggleInvalidClass
});
