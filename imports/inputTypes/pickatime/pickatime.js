/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Blaze } from 'meteor/blaze';
import moment from 'moment';
import 'meteor/mozfet:materialize-time-picker';
import './pickatime.html';

const TIME_FORMAT = 'h:mm A';

console.log('pickatime - add input type');

//add autoform input
AutoForm.addInputType('pickatime', {
  template: 'afInputPickatime_materialize',
  valueOut: function() {
    console.log('pickatime: valueOut.this', this);
    return this.val();
  }
});

//when created
Template.afInputPickatime_materialize.onCreated(() => {
  const instance = Template.instance();
  console.log('pickatime.instance', instance);

  //initialise value
  instance.value = new ReactiveVar();
});

//when rendered
Template.afInputPickatime_materialize.onRendered(() => {
  const instance = Template.instance();

  //get input on dom
  const qInput = $('#'+instance.data.atts.id);
  console.log('pickatime.qInput', qInput);
  const qParent = qInput.parent().parent().parent();
  console.log('pickatime.qParent', qParent.html());
  const qLabel = qParent.find('label');
  console.log('pickatime.qLabel', qLabel);

  //autorun when instance value change
  instance.autorun(() => {

    //get instance value
    const val = instance.value.get();

    //if value is set
    if(val) {

      //add active class to label
      qLabel.addClass('active');
    }

    //else - no value
    else {

      //remove active class from label
      qLabel.removeClass('active');
    }

  });
});

//helpers
Template.afInputPickatime_materialize.helpers({
  reactiveValue() {
    return Template.instance().reactiveValue.get();
  },
  attr() {
    const instance = Template.instance();
    const atts = instance.data.atts;
    const val = instance.value.get();
    return {
      'id'                : atts.id,
      'data-schema-key'   : atts['data-schema-key'],
      'class'             : 'js-timepicker-trigger',
      'type'              : 'text',
      'data-value'        : val,
      'value'             : val
    };
  },
  value() {
    const instance = Template.instance();
    return instance.value;
  },
  id() {
    const instance = Template.instance();
    return instance.id;
  }
});

//events
Template.afInputPickatime_materialize.events({
});
