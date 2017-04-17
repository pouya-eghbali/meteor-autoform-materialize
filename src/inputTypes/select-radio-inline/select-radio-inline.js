/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './select-radio-inline.html';
import { dsk } from '../../utilities/dsk';
import { selectedAttsAdjust } from '../../utilities/selectedAttsAdjust';

Template.afRadioGroupInline_materialize.helpers({
  dsk:      dsk,
  itemAtts: selectedAttsAdjust
});
