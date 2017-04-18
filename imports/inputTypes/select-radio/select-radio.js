/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './select-radio.html';
import { dsk } from '../../utilities/dsk';
import { selectedAttsAdjust } from '../../utilities/selectedAttsAdjust.js';

Template.afRadioGroup_materialize.helpers({
  dsk:      dsk,
  itemAtts: selectedAttsAdjust
});
