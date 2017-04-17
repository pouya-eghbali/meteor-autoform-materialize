/*jshint esversion: 6 */

export const optionAtts = () => {
  var atts, item;
  item = this;
  atts = {
    value: item.value
  };
  if (item.selected) {
    atts.selected = '';
  }
  return atts;
};
