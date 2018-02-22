/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './flowtext.html';

const textToParagraphs = (text) => {
  text = _.isEmpty(text)?"":text;
  let paragraphs = text.split("\n");
  paragraphs = _.chain(paragraphs)
      .map((par) => {
        return par.trim();
      })
      .filter((par) => {
        return !_.isEmpty(par);
      }).value();
  // Log.log(['debug', 'text'], 'Paragraphs:', paragraphs);
  return paragraphs;
};


//add autoform input
AutoForm.addInputType('flowtext', {
  template: 'afInputFlowtext_materialize',
  valueOut: function() {
    console.log('flowtext: valueOut.this', this);
    return this.val();
  }
});

Template.afInputFlowtext_materialize.helpers({
  atts() {
    const instance = Template.instance();
    return _.extend(instance.data.atts, {
      id: instance.data.atts.name,
      type: 'hidden',
      value: instance.data.value
    });
  },

  value() {
    const instance = Template.instance();
    return instance.data.value;
  },

  paragraphs() {
    const instance = Template.instance();
    return textToParagraphs(instance.data.value);
  }

});
