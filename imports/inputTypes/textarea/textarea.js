/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './textarea.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afTextarea_materialize.helpers({
  atts: function ()  {
    const atts = attsToggleInvalidClass.call(this);
    return AutoForm.Utility.addClass(atts, "materialize-textarea");
  }
});

Template.afTextarea_materialize.onRendered(() => {
  const instance = Template.instance();
  instance.$('textarea').characterCounter();
});
