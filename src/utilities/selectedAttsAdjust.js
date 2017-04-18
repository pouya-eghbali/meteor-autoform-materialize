/*jshint esversion: 6 */

export const selectedAttsAdjust = () => {
  const instance = Template.instance();
  const atts = _.clone(instance.atts);

  if (instance.selected) {
    atts.checked = "";
  }

  atts.id = atts.id + "_" + instance._id;
  delete atts['data-schema-key'];
  return atts;
};
