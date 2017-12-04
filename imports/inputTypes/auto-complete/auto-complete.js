/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './auto-complete.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';
import 'materialize-autocomplete';

//add autoform input
AutoForm.addInputType('autocomplete', {
  template: 'afAutoComplete_materialize',
  valueOut: function() {

    // get the options
    console.log('valueOut.this', this);

    return this.val();
  }
});

//when created
Template.afAutoComplete_materialize.onCreated(() => {
  const instance = Template.instance();
  console.log('AutoComplete.onCreated.instance.data', instance.data);

  //if value was provided
  let value;
  if(instance.data.value) {

    //use provided value as value
    value = instance.data.value;
  }

  //initialise value
  instance.value = new ReactiveVar(value);
});

//when rendered
Template.afAutoComplete_materialize.onRendered(() => {
  const instance = Template.instance();

  //get value
  let value = instance.value.get();

  // if there is no initialised value and there is a default value
  if(_.isUndefined(value) && instance.data.atts.default) {

    // set the default value as value
    value = instance.data.atts.default;
  }

  // if there is a value
  if(value) {

    // set the input value
    instance.$('input').val(value);

    // mark the input as active
    instance.$('input').parent().find('label').addClass('active');
  }

  //initialise autocomplete options
  let options;
  if(instance.data.atts && instance.data.selectOptions) {
    options = _.clone(instance.data.selectOptions);
  }
  else {
    options = {};
  }
  console.log('AutoComplete.onRendered.options:', options);

  // get the display limit
  const displayLimit = instance.data.atts.autoComplete &&
      instance.data.atts.autoComplete.displayLimit?
      instance.data.atts.autoComplete.displayLimit:20;

  // init materialize autocomplete form component
  instance.autocomplete = instance.$('input').materialize_autocomplete({
    limit: displayLimit,
    multiple: {
      enable: false,
      maxSize: 10
    },
    dropdown: {
        el: '#autoCompleteDropdown_'+instance.data.atts.id,
        itemTemplate: '<li class="ac-item" data-id="<%= item.id %>" '+
            'data-text=\'<%= item.text %>\'><a href="javascript:void(0)">'+
            '<%= item.highlight %></a></li>'
    },
    // appender: {
    //     el: '#someEl'
    // },
    getData(value, callback) {
      console.log('AutoComplete.getData:', value);

      // get all options starting with value
      const matchingOptions = _.filter(options, (option) => {
        return option.label.toUpperCase().startsWith(value.toUpperCase());
      });
      console.log('AutoComplete.matchingOptions:', matchingOptions);

      // map matching options {id, text}
      let dataId = 1;
      const data = _.map(matchingOptions, (option) => {
        dataId++;

        //highlight the value part of the option label
        let highlight = '<strong>'+option.label.substring(0, value.length)+'</strong>'+
            option.label.substring(value.length, option.label.length);

        return {
          id: dataId,
          text: option.label,
          highlight: highlight
        };
      });
      console.log('AutoComplete.data:', data);

      // node style callback
      callback(value, data);
    }
  });
});

//helpers
Template.afAutoComplete_materialize.helpers({
  atts() {
    const instance = Template.instance();
    const atts = instance.data.atts;
    const val = instance.value.get();
    const result = {
      'id'                : atts.id,
      'data-schema-key'   : atts['data-schema-key'],
      'data-value'        : val,
      'value'             : val,
      'type'              : "text",
      'data-activates'    : 'autoCompleteDropdown_'+atts.id,
      'data-beloworigin'  : "true",
      'autocomplete'      : "off"
    };
    if (atts.placeholder) {
      result.placeholder = atts.placeholder;
    }
    return result;
  },
  value() {
    const instance = Template.instance();
    return instance.value.get();
  },
  inputId() {
    const instance = Template.instance();
    return instance.data.atts.id;
  },
  autoCompleteId() {
    const instance = Template.instance();
    return 'autoComplete_'+instance.data.atts.id;
  },
  dropdownId() {
    const instance = Template.instance();
    return 'autoCompleteDropdown_'+instance.data.atts.id;
  }
});
