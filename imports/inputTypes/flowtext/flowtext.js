/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './flowtext.html';

//add autoform input
AutoForm.addInputType('flowtext', {
  template: 'afInputFlowtext_materialize',
  valueOut: function() {
    // console.log('pickatime: valueOut.this', this);
    return this.val();
  }
});

Template.afInputFlowtext_materialize.helpers({
  atts: {
    class: 'flow-text'
  }
});
