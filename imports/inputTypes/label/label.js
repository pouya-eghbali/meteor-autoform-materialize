/*jshint esversion: 6 */

import { Template } from "meteor/templating";
import "./label.html";

Template.afLabel_materialize.helpers({
  atts: function () {
    const instance = Template.instance();
    const labelAtts = instance.afFieldLabelAtts;
    return labelAtts;
  },
  isRequired() {
    return this.required || this.afFieldInputAtts.required;
  },
});
