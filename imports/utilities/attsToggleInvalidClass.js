// imports
import { AutoFrom } from 'meteor/aldeed:autoform';

/**
 * Add invalid class if invalid
 * @param {}  -
 * @returns {}
 **/
export const attsToggleInvalidClass = function () {
  let atts    = _.clone(this.atts);
  const context = AutoForm.getFormSchema().namedContext(AutoForm.getFormId());

  if (context.keyIsInvalid(atts.name)) {
    atts = AutoForm.Utility.addClass(atts, 'invalid');
  }

  return atts;
};
