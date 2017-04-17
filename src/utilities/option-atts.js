/*jshint esversion: 6 */

export const optionAtts = () => {
  const instance = Template.instance();
  const item = instance;
  const atts = {
    value: item.value
  };
  if (item.selected) {
    atts.selected = '';
  }
  return atts;
};
