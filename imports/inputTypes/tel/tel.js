/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './tel.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afInputTel_materialize.helpers({
  atts: attsToggleInvalidClass
});
