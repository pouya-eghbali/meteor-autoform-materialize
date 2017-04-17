/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './datetime.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afInputDateTime_materialize.helpers({
  atts: attsToggleInvalidClass
});
