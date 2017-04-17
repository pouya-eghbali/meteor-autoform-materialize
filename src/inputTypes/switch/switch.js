/*jshint esversion: 6 */
import { AutoForm } from 'meteor/aldeed:autoform';
import { Template } from 'meteor/templating';
import './switch.html';

AutoForm.addInputType('switch', {
  template: 'afSwitch',
  valueIn: (value) => {
    return value;
  },
  valueOut: function() {
    var ref, ref1, result;
    const input = this[0];
    const checked = input.checked;
    if (checked) {
      result = ((ref = input.attributes.trueValue) !== null ? ref.value : void 0) || true;
    } else {
      result = ((ref1 = input.attributes.falseValue) !== null ? ref1.value : void 0) || false;
    }
    return result;
  }
});

Template.afSwitch.onRendered(() => {
  const instance = Template.instance();

  //get input
  const input = instance.$('input');

  //autorun
  instance.autorun(() => {
    return function() {
      var data, trueValue;
      data = Template.currentData();
      trueValue = _this.data.atts.trueValue || true;
      return input.prop('checked', data.value === trueValue);
    };
  });
  return;
});

Template.afSwitch.helpers({
  atts: () => {
    const instance = Template.instance();
    return _.extend(instance.atts, {
      id: instance.atts.name
    });
  }
});
