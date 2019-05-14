/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './quickForm.html';

Template.quickForm_materialize.helpers({
  submitButtonAtts: function() {
    var atts, qfAtts;
    qfAtts = this.atts;
    atts = {};
    if (typeof qfAtts.buttonClasses === 'string') {
      atts['class'] = qfAtts.buttonClasses;
    } else {
      atts['class'] = 'btn waves-effect waves-light';
    }
    return atts;
  },
  groupped: function (fields, options) {    
    let schema = AutoForm.getFormSchema()._schema;
    let groups = {}
    fields.forEach(function(field){
      let autoform = schema[field.name.replace(/\.\d+/g, '.$')].autoform || {};
      const group = autoform.group || 'default';
      const title = autoform.groupTitle || '';
      const help = autoform.groupHelp || '';      
      const gorder = autoform.groupOrder != undefined ? autoform.groupOrder : 999;
      const order = autoform.order != undefined ? autoform.order : 999;
      groups[group] = groups[group] || { name: group, fields: [] };
      groups[group].fields.push(field);
      groups[group].order = groups[group].order || gorder;
      groups[group].help = groups[group].help || help;
      groups[group].title = groups[group].title || title;
      field.order = order;
    })
    Object.values(groups).forEach(function (group) {
      group.fields = group.fields.sort((a, b) => {
        return a.order - b.order
      })
    })
    return Object.values(groups).sort((a, b) => {
      return a.order - b.order
    })
  }
});
