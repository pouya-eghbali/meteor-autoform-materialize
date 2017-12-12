/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import {ReactiveArray} from 'meteor/manuel:reactivearray';
import './auto-complete.html';
// import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';
import './jquery.materialize-autocomplete';

//add autoform input
AutoForm.addInputType('autocomplete', {
  template: 'afAutoComplete_materialize',
  valueOut: function() {
    return this.val();
  }
});

//when created
Template.afAutoComplete_materialize.onCreated(() => {
  const instance = Template.instance();

  // initialise multiple
  const multiple = instance.data.atts && instance.data.atts.autoComplete &&
      instance.data.atts.autoComplete.multiple?
      instance.data.atts.autoComplete.multiple:false;
  console.log('autoComplete.onCreated.multiple:', multiple);
  instance.multiple = multiple;

  // initialise value
  let value = instance.data.value?instance.data.value:instance.data.atts.default;
  value = _.isUndefined(value)?(instance.multiple?[]:''):value;
  console.log('autoComplete.onCreated.value:', value);
  instance.value = new ReactiveVar(value);

  // initialise input value
  const inputValue = instance.data.atts.multiple?'':value;
  instance.inputValue = new ReactiveVar(inputValue);
  console.log('autoComplete.onCreated.inputValue:', inputValue);

  // initialise options and sort them by label
  let options = instance.data.selectOptions?instance.data.selectOptions:[];
  for (let option of options) {
    option.value = _.isString(option)?option:option.value;
    option.label = option.label?option.label:option.value;
    option.upperCaseLabel = option.label.toUpperCase();
  }
  options = _.sortBy(options, (opt) => {
    return opt.label;
  });
  console.log('autoComplete.onCreated.options:', options);
  instance.options = options;

  // initialise items
  instance.items = new ReactiveArray([]);

  // initialise display limit
  const displayLimit = instance.data.atts && instance.data.atts.autoComplete &&
      instance.data.atts.autoComplete.displayLimit?
      instance.data.atts.autoComplete.displayLimit:20;
  console.log('autoComplete.onCreated.displayLimit:', displayLimit);
  instance.displayLimit = displayLimit;

  // initialise placeholder
  const placeholder = instance.data.atts && instance.data.atts.placeholder?
      instance.data.atts.placeholder:undefined;
  console.log('autoComplete.onCreated.placeholder:', placeholder);
  instance.placeholder = new ReactiveVar(placeholder);
});

//when rendered
Template.afAutoComplete_materialize.onRendered(() => {
  const instance = Template.instance();

  // assign label to instance
  instance.$label = instance.$('.auto-complete').parent().find('label');
  console.log('autocomplete.onRendered.instance.$label:', instance.$label);

  // assign hidden to instance
  instance.$hidden = instance.$('.auto-complete-hidden-select');
  console.log('autocomplete.onRendered.instance.$hidden:', instance.$hidden);

  // initialise the dropdown - probably not needed
  instance.$('.auto-complete-input').dropdown({
    belowOrigin: true,
    stopPropagation: true
  });

  // when value or placeholder changes
  instance.autorun(() => {

    const value = instance.value.get();
    const placeholder = instance.placeholder.get();
    console.log('autocomplete.onRendered.autorun1.value:', value);
    console.log('autocomplete.onRendered.autorun1.placeholder:', placeholder);

    // if there is no value and no placeholder
    if((_.isUndefined(value) || _.isEmpty(value)) || !_.isEmpty(placeholder)) {
      console.log('autocomplete.onRendered.autorun1.activate');

      // remove active class from label
      instance.$label.addClass('active');
    }

    // else - value or placeholder exists
    else {
      console.log('autocomplete.onRendered.autorun1.activate');

      // add active class to label
      instance.$label.removeClass('active');
    }
  });

  // when input value changes
  instance.autorun(() => {
    const instance = Template.instance();
    const inputValue = instance.inputValue.get();
    // console.log('autocomplete.onRendered.autorun2.inputValue:', inputValue);

    // fuck knows why, but apparently there is some reactive listing going on
    Tracker.nonreactive(() => {

      // if there is a input value
      if (!_.isUndefined(inputValue) && !_.isEmpty(inputValue)) {
        // console.log('autocomplete.onRendered.autorun2.inputValuePresent');

        // get instance options
        const options = instance.options;
        // console.log('autocomplete.onRendered.autorun2.options:', options);

        // get display limit
        const displayLimit = instance.displayLimit;
        // console.log('autocomplete.onRendered.autorun2.displayLimit:', displayLimit);

        // format the value to upper case for comparison
        const upperCaseInputValue = inputValue.toUpperCase();

        // clear the instance items
        instance.items.clear();

        // open the dropdown
        instance.$('.auto-complete-input').dropdown('open');

        // loop while number of items is less than display limit
        let index = 0;
        while (instance.items.list().length < displayLimit) {

          // get the option at index
          const option = options[index];
          // console.log('autocomplete.onRendered.autorun2.while.option:', option);

          // if option upper case label matches upper case value
          if (option.upperCaseLabel.startsWith(upperCaseInputValue)) {
            instance.items.push(option);
          }

          // increment index
          index++;

          // if index is out of bounds
          if (index === options.length) {

            //break from the while loop
            break;
          }
        }
      }
      //else - no input value
      else {

        // clear the instance items
        instance.items.clear();

        // close the dropdown
        instance.$('.auto-complete-input').dropdown('close');
      }
    });

  });
});

//helpers
Template.afAutoComplete_materialize.helpers({

  // html element attributes for the text input
  inputAtts() {
    const instance = Template.instance();
    const atts = instance.data.atts;
    const val = instance.value.get();
    const result = {
      'class'             : 'auto-complete-input',
      'value'             : val,
      'type'              : 'text',
      'data-activates'    : 'auto-complete-dropdown-'+atts.id,
      'data-beloworigin'  : 'true',
      'autocomplete'      : 'off'
    };
    if (atts.placeholder) {
      result.placeholder = atts.placeholder;
    }
    return result;
  },

  // html element attributes for the hidden select
  hiddenAtts() {
    const instance = Template.instance();
    const atts = instance.data.atts;
    const result = {
      'id'                : atts.id,
      'data-schema-key'   : atts['data-schema-key'],
      'type'              : 'hidden',
      'class'             : 'auto-complete-hidden-select validate'
    };
    if (atts.multiple) {
      result.multiple = 'multiple';
    }
    return result;
  },

  // helper to get the options for the hidden select
  options() {
    return Template.instance().options;
  },

  // helper for options to determine if they are selected in the hidden select
  selectedOption(option) {
    console.log('autoComplete.helpers.selectedOption.option:', option);

    //get value
    const instance = Template.instance();
    let value = instance.value.get();

    // normalise value as an array
    value = value?value:[];
    const values = _.isArray(value)?value:[{value: value}];
    console.log('autoComplete.helpers.selectedOption.values:', values);

    // if value contains this option
    const valueHasOption = _.find(values, (val) => {
      return val.value === option.value;
    });
    console.log('autoComplete.helpers.selectedOption.valueHasOption:',
        valueHasOption);
    if (valueHasOption) {
      console.log('autoComplete.helpers.selectedOption.valueHasOption');

      // return selected
      return 'selected';
    }
    else {

      // return empty string
      return '';
    }
  },

  // attributes for the dropdown
  dropdownAtts() {
    const instance = Template.instance();
    const atts = instance.data.atts;
    const inputValue = instance.inputValue.get();
    console.log('autoComplete.helpers.selectedOption.inputValue:', inputValue);
    const result = {
      'id'                : 'auto-complete-dropdown-'+atts.id,
      'data-schema-key'   : atts['data-schema-key'],
      'class'             : 'dropdown-content'
    };
    return result;
  },

  // the list of items for the dropdown list
  items() {
    return Template.instance().items.list();
  }
});

// events
Template.afAutoComplete_materialize.events({

  // when focus on auto complete input
  'focus .auto-complete-input'(event, instance) {
    // console.log('focus', instance.data.atts.name);
  },

  // when key is pressed
  'keydown .auto-complete-input' (event, instance) {
    console.log('autoComplete.events.keydown:', event);
    // if key is enter
    if ( event.which === 13) {
      console.log('autoComplete.events.keydown.key.enter');

      // if there is an item selected
        // if instance.multiple
          // add
          // clear input val
          // set the first item in the list as selected
        // else - singular
          // set instance.value to the selected item
          // set $select.val to the selected item label

      console.log('autoComplete.events.keydown.key.enter.stopPropagation');
      event.stopPropagation();
      return false;
    }
  },

  // when input is updated
  'input .auto-complete-input' (event, instance) {
    console.log('autoComplete.events.input:', event);
    event.preventDefault();

    // get the input value
    const inputValue = event.currentTarget.value;
    console.log('autoComplete.events.input.inputValue:', inputValue);
    instance.inputValue.set(inputValue);

    // get the key that was pressed
    const key = event.which;
    console.log('autoComplete.events.input.key:', key);

    // if key is enter
    if (key === 13) {
      console.log('autoComplete.events.input.key.enter');

    }
    // if key is backspace
    else if (key === 8) {
      console.log('autoComplete.events.input.key.backspace');
      // if input has value
        // backspace on input
      // else - input has no value
        // if value is array and is not empty
          // remove the last item of value
    }
    // else if key is up
    else if (key === 38) {
      console.log('autoComplete.events.input.key.up');
      // select the previous item on the list
    }
    // else if key is down
    else if (key === 40) {
      console.log('autoComplete.events.input.key.down');
      // select the next item on the list
    }
    // else - any other key is pressed
    else {
      console.log('autoComplete.events.input.other');
    }

    // mark the event as handled
    return true;
  },

  // when click on dropdown item
  'click li'(event, instance) {
    console.log('autoComplete.events.click.li', event.currentTarget);
    const value = $(event.currentTarget).data('value');
    console.log('autoComplete.events.click.li.value:', value);

    // if multiple
    if (instance.multiple) {
      console.log('autoComplete.events.click.li.multiple:', instance.multiple);

      // get the value
      const instanceValue = instance.value.get();
      console.log('autoComplete.events.click.li.instanceValue:', instanceValue);

      // push the value
      instanceValue.push(value);

      // set the instance value
      instance.value.set(instanceValue);

      // clear the input value
      instance.$('.auto-complete-input').val();
    }
    // else - singular
    else {
      console.log('autoComplete.events.click.li.singular');

      // set the instance value
      instance.value.set(value);

      // set the input value
      instance.inputValue.set(value);
    }
  }

});
