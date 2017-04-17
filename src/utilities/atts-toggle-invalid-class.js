/*jshint esversion: 6 */

import { AutoFrom } from 'meteor/aldeed:autoform';

export const attsToggleInvalidClass = () => {
  const instance = Template.instance();
  var atts    = _.clone(instance.atts);
  var context = AutoForm.getFormSchema().namedContext(AutoForm.getFormId());

  if (context.keyIsInvalid(atts.name)) {
    atts = AutoForm.Utility.addClass(atts, 'invalid');
  }

  return atts;
};
