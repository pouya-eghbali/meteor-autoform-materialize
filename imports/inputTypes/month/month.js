/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './month.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afInputMonth_materialize.helpers({
  atts: attsToggleInvalidClass
});
