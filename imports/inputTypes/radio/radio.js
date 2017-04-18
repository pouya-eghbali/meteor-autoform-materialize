/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './radio.html';
import { attsCheckSelected } from '../../utilities/attsCheckSelected';
import { dsk } from '../../utilities/dsk';

Template.afRadio_materialize.helpers({
  atts:     attsCheckSelected,
  dsk:      dsk,
});
