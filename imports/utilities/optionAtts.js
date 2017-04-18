/*jshint esversion: 6 */

export const optionAtts = function () {
  const item = this;
  const atts = {
    value: item.value
  };
  if (item.selected) {
    atts.selected = '';
  }
  return atts;
};
