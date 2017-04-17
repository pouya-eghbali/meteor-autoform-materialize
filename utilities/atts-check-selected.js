/*jshint esversion: 6 */

import { attsToggleInvalidClass } from './atts-toggle-invalid-class';

export const attsCheckSelected = () => {
  var atts = attsToggleInvalidClass.call(this);
  if (this.selected) {
    atts.checked = '';
  }
  return atts;
};
