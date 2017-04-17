/*jshint esversion: 6 */

import { attsToggleInvalidClass } from './atts-toggle-invalid-class';

export const attsCheckSelected = () => {
  const instance = Template.instance();
  var atts = attsToggleInvalidClass.call(instance);
  if (instance.selected) {
    atts.checked = '';
  }
  return atts;
};
