/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './time.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afInputTime_materialize.helpers({
  atts: attsToggleInvalidClass
});
