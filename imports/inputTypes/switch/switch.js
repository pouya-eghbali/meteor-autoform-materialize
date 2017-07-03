/*jshint esversion: 6 */
import { AutoForm } from 'meteor/aldeed:autoform';
import { Template } from 'meteor/templating';
import './switch.html';

AutoForm.addInputType('switch', {
  template: 'afSwitch',
  valueIn: (value) => {
    // console.log('valueIn.value:', value);
    return value;
  },
  valueOut: function() {
    // console.log('valueOut.this:', this);
    let ref, result;
    const input = this[0];
    const checked = input.checked;
    if (checked) {
      if(_.isUndefined(input.attributes.truevalue)) {
        result = true;
      }
      else {
        result = input.attributes.truevalue.nodeValue;
      }
    }
    else {
      if(_.isUndefined(input.attributes.falsevalue)) {
        result = false;
      }
      else {
        result = input.attributes.falsevalue.nodeValue;
      }
    }
    // console.log('result:', result);

    //return
    return result;
  }
});

Template.afSwitch.onRendered(() => {
  const instance = Template.instance();
  // console.log('afSwitch.onRendered.instance:', instance);

  //get input
  const input = instance.$('input');

  //autorun
  instance.autorun(() => {

    //reactive update the input based on the input data
    // console.log('afSwitch.onRendered.autorun.instance.data.value:', instance.data.value);
    const data = Template.currentData();
    const trueValue = instance.data.atts.trueValue || true;
    const checked = instance.data.value === trueValue;
    input.prop('checked', checked);
  });
});

Template.afSwitch.helpers({
  atts: () => {
    const instance = Template.instance();
    console.log('afSwitch.instance:', instance);
    return _.extend(instance.data.atts, {
      id: instance.data.atts.name
    });
  }
});
