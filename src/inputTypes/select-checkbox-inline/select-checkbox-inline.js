/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './select-checkbox-inline.html';
import { dsk } from '../../utilities/dsk';
import { selectedAttsAdjust } from '../../utilities/selectedAttsAdjust';

Template.afCheckboxGroupInline_materialize.helpers({
  dsk:      dsk,
  itemAtts: selectedAttsAdjust
})
