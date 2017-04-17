/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './select-checkbox.html';
import { dsk } from '../../utilities/dsk';
import { selectedAttsAdjust } from '../../utilities/selectedAttsAdjust';

Template.afCheckboxGroup_materialize.helpers({
  dsk:      dsk,
  itemAtts: selectedAttsAdjust,
});
