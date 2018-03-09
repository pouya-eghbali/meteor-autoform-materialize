/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './select.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';
import { optionAtts } from '../../utilities/optionAtts';
import { initializeSelect } from '../../utilities/initializeSelect';

Template.afSelect_materialize.helpers({
  atts: attsToggleInvalidClass,
  optionAtts: optionAtts,
  firstValueSelected: function () {
    const data = Template.currentData();
    if (isEmptySelect(data.value) &&
        (data.atts.firstOption || data.atts.placeholder)) {
      return true;
    }
    else {
      return false;
    }
  }
});

Template.afSelect_materialize.onRendered(initializeSelect);
