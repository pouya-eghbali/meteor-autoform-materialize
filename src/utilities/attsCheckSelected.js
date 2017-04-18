/*jshint esversion: 6 */

import { attsToggleInvalidClass } from './attsToggleInvalidClass';

export const attsCheckSelected = function () {
  const atts = attsToggleInvalidClass.call(this);
  if (this.selected) {
    atts.checked = '';
  }
  return atts;
};
