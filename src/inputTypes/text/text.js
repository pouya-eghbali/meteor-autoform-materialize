/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './text.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afInputText_materialize.helpers({
  atts: attsToggleInvalidClass
});
