/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './url.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afInputUrl_materialize.helpers({
  atts: attsToggleInvalidClass
});
