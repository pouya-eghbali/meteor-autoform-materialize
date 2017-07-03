/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './flowtext.html';

//add autoform input
AutoForm.addInputType('flowtext', {
  template: 'afInputFlowtext_materialize',
  valueOut: function() {
    // console.log('flowtext: valueOut.this', this);
    return this.val();
  }
});

Template.afInputFlowtext_materialize.helpers({
  atts: {
    class: 'flow-text'
  },
  value() {
    const instance = Template.instance();
    // console.log('flowtext.instance:', instance);
    return instance.data.value;
  }
});
