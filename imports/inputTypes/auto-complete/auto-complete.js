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
  // console.log('autoComplete.onCreated.instance:', instance);

  // initialise multiple
  const multiple = instance.data.atts && instance.data.atts.multiple?
      instance.data.atts.multiple:false;
  // console.log('autoComplete.onCreated.multiple:', multiple);
  instance.multiple = multiple;

  // initialise value
  let value = instance.data.value?instance.data.value:instance.data.atts.default;
  value = _.isUndefined(value)?(instance.multiple?[]:''):value;
  // console.log('autoComplete.onCreated.value:', value);
  instance.value = new ReactiveVar(value);

  // initialise input value
  // const inputValue = instance.data.atts.multiple?'':value;
  const inputValue = '';
  instance.inputValue = new ReactiveVar(inputValue);
  // console.log('autoComplete.onCreated.inputValue:', inputValue);

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
  // console.log('autoComplete.onCreated.options:', options);
  instance.options = options;

  // initialise items
  instance.items = new ReactiveArray([]);

  // initialise display limit
  const displayLimit = instance.data.atts && instance.data.atts.displayLimit?
      instance.data.atts.displayLimit:20;
  // console.log('autoComplete.onCreated.displayLimit:', displayLimit);
  instance.displayLimit = displayLimit;

  // initialise placeholder
  const placeholder = instance.data.atts && instance.data.atts.placeholder?
      instance.data.atts.placeholder:undefined;
  // console.log('autoComplete.onCreated.placeholder:', placeholder);
  instance.placeholder = new ReactiveVar(placeholder);
});

//when rendered
Template.afAutoComplete_materialize.onRendered(() => {
  const instance = Template.instance();

  // assign label to instance
  instance.$label = instance.$('.auto-complete').parent().find('label');
  // console.log('autocomplete.onRendered.instance.$label:', instance.$label);

  // assign hidden to instance
  instance.$hidden = instance.$('.auto-complete-hidden-select');
  // console.log('autocomplete.onRendered.instance.$hidden:', instance.$hidden);

  // initialise the dropdown - probably not needed
  instance.$('.auto-complete-input').dropdown({
    belowOrigin: true,
    stopPropagation: true
  });

  // when value or placeholder changes
  instance.autorun(() => {

    const value = instance.value.get();
    const placeholder = instance.placeholder.get();
    // console.log('autocomplete.onRendered.autorun1.value:', value);
    // console.log('autocomplete.onRendered.autorun1.placeholder:', placeholder);

    const hasNoValue = _.isUndefined(value) || _.isEmpty(value);
    // console.log('autocomplete.onRendered.autorun1.hasNoValue:', hasNoValue);

    // if there is no value and no placeholder
    if(hasNoValue && _.isEmpty(placeholder)) {

      // remove active class from label
      // console.log('autocomplete.onRendered.autorun1.deactivate');
      instance.$label.removeClass('active');
    }

    // else - value or placeholder exists
    else {

      // add active class to label
      // console.log('autocomplete.onRendered.autorun1.activate');
      instance.$label.addClass('active');
    }
  });

  // generate items for the dropdown when input value changes
  instance.autorun(() => {
    const instance = Template.instance();
    const inputValue = instance.inputValue.get();
    // console.log('autocomplete.onRendered.autorun2.inputValue:', inputValue);

    // get instance options
    const options = instance.options;
    // console.log('autocomplete.onRendered.autorun2.options:', options);

    // if there are options
    if (!_.isEmpty(options)) {

      // TODO dont know why this has to be nonreactive, but apparently there is some reactive listing going on causing an infinate loop
      Tracker.nonreactive(() => {

        // if there is a input value
        if (!_.isUndefined(inputValue) && !_.isEmpty(inputValue)) {
          // console.log('autocomplete.onRendered.autorun.generateItems.inputValuePresent:', inputValue);

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

              // if multiple
              if (instance.multiple) {

                // if option is not in value
                const valueExists = _.find(instance.value.get(), (val) => {
                  return val === option.value;
                });
                if (!valueExists) {

                  // push option to items
                  instance.items.push(option);
                }
              }

              // else - singular
              else {

                // push option to items
                instance.items.push(option);
              }
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
          // console.log('autocomplete.onRendered.autorun.generateItems.noInputValuePresent:', inputValue);

          // clear the instance items
          instance.items.clear();

          // close the dropdown
          instance.$('.auto-complete-input').dropdown('close');
        }
      });
    }



  });
});

//helpers
Template.afAutoComplete_materialize.helpers({

  // html element attributes for the text input
  inputAtts() {
    const instance = Template.instance();
    const atts = instance.data.atts;

    const result = {
      'class'             : 'auto-complete-input',
      'type'              : 'text',
      'data-activates'    : 'auto-complete-dropdown-'+atts.id,
      'data-beloworigin'  : 'true',
      'autocomplete'      : 'off'
    };

    // if singular
    if (!instance.multiple) {

      // get value
      const value = instance.value.get();
      // console.log('autoComplete.helpers.inputAtts.value:', value);

      if (!_.isUndefined(value) && !_.isEmpty(value)) {

        // find option for value
        // console.log('autoComplete.helpers.inputAtts.options:', instance.options);
        const option = _.find(instance.options, (opt) => {
          return value === opt.value;
        });

        // set input value attribute to label
        result.value = option.label;
      }
    }

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
    if (instance.multiple) {
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
    // console.log('autoComplete.helpers.selectedOption.option:', option);

    //get value
    const instance = Template.instance();
    let value = instance.value.get();

    // normalise value as an array
    value = value?value:[];
    const values = _.isArray(value)?value:[value];
    // console.log('autoComplete.helpers.selectedOption.values:', values);

    // if value contains this option
    const valueHasOption = _.find(values, (val) => {
      return val === option.value;
    });
    if (valueHasOption) {
      // console.log('autoComplete.helpers.selectedOption.valueHasOption:', valueHasOption);

      // return selected true
      return true;
    }
    else {

      // return selected false
      return false;
    }
  },

  // attributes for the dropdown
  dropdownAtts() {
    const instance = Template.instance();
    const atts = instance.data.atts;
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
  },

  // true if auto complete is multiple
  multiple() {
    return Template.instance().multiple;
  },

  value() {
    return Template.instance().value.get();
  },

  label(value) {
    const instance = Template.instance();
    const option = _.find(instance.options, (opt) => {
      return value === opt.value;
    });
    return option.label;
  }
});

// events
Template.afAutoComplete_materialize.events({

  // when focus on auto complete input
  'focus .auto-complete-input'(event, instance) {
    // console.log('focus', instance.data.atts.name);
    instance.$label.addClass('active');
  },

  // when key is pressed
  'keydown .auto-complete-input' (event, instance) {
    // console.log('autoComplete.events.keydown:', event);
    // if key is enter
    if ( event.which === 13) {
      //console.log('autoComplete.events.keydown.key.enter');

      //TODO select item

      //console.log('autoComplete.events.keydown.key.enter.stopPropagation');
      event.stopPropagation();
      return false;
    }
  },

  // when input is updated
  'input .auto-complete-input' (event, instance) {
    // console.log('autoComplete.events.input:', event);
    event.preventDefault();

    // get the input value
    const inputValue = event.currentTarget.value;
    // console.log('autoComplete.events.input.inputValue:', inputValue);
    instance.inputValue.set(inputValue);

    // get the key that was pressed
    const key = event.which;
    // console.log('autoComplete.events.input.key:', key);

    // if key is enter
    if (key === 13) {
      // console.log('autoComplete.events.input.key.enter');

    }
    // if key is backspace
    else if (key === 8) {
      // console.log('autoComplete.events.input.key.backspace');
      // if input has value
        // backspace on input
      // else - input has no value
        // if value is array and is not empty
          // remove the last item of value
    }
    // else if key is up
    else if (key === 38) {
      // console.log('autoComplete.events.input.key.up');
      // select the previous item on the list
    }
    // else if key is down
    else if (key === 40) {
      // console.log('autoComplete.events.input.key.down');
      // select the next item on the list
    }
    // else - any other key is pressed
    else {
      // console.log('autoComplete.events.input.other');
    }

    // mark the event as handled
    return true;
  },

  // when click on dropdown item
  'click li'(event, instance) {
    // console.log('autoComplete.events.click.li', event.currentTarget);
    const value = $(event.currentTarget).data('value');
    // console.log('autoComplete.events.click.li.value:', value);
    const label = $(event.currentTarget).data('label');
    // console.log('autoComplete.events.click.li.lable:', label);

    // if multiple
    if (instance.multiple) {
      // console.log('autoComplete.events.click.li.multiple:', instance.multiple);

      // get the instance value
      let instanceValue = instance.value.get();
      // console.log('autoComplete.events.click.li.instanceValue:', instanceValue);

      // push the value onto the instance value
      instanceValue.push(value);

      // set the instance value
      instance.value.set(instanceValue);

      // clear the input element value
      instance.$('.auto-complete-input').val('');

      // set the instance value to empty string
      instance.inputValue.set('');
    }
    // else - singular
    else {
      // console.log('autoComplete.events.click.li.singular');

      // set the instance value
      instance.value.set(value);

      // set the input element value to the label
      instance.$('.auto-complete-input').val(label);

      // set the instance value to the label
      instance.inputValue.set(label);
    }
  },

  // when click on tag icon
  'click .tags i'(event, instance) {
    // console.log('autoComplete.events.click.closeTag');
    const value = $(event.currentTarget).data('value');
    // console.log('autoComplete.events.click.closeTag.value:', value);
    const instanceValue = instance.value.get();
    const newValue = _.without(instanceValue, value);
    instance.value.set(newValue);
  }

});
