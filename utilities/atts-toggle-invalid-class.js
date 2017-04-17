/*jshint esversion: 6 */

import { AutoFrom } from 'meteor/aldeed:autoform';

export const attsToggleInvalidClass = () => {
  var atts    = _.clone(this.atts);
  var context = AutoForm.getFormSchema().namedContext(AutoForm.getFormId());

  if (context.keyIsInvalid(atts.name)) {
    atts = AutoForm.Utility.addClass(atts, 'invalid');
  }

  return atts;
};
