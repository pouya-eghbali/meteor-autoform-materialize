/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './search.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afInputSearch_materialize.helpers({
  atts: attsToggleInvalidClass
});
