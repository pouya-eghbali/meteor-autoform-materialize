import { Template } from 'meteor/templating'
import './auto-complete.html'
// import './jquery.materialize-autocomplete'

// add autoform input
AutoForm.addInputType('autocomplete', {
  template: 'afAutoComplete_materialize',
  valueOut: function() {
    return this.val()
  }
})

// when created
Template.afAutoComplete_materialize.onCreated(() => {
  const instance = Template.instance()

  // initialise multiple
  const multiple = instance.data.atts && instance.data.atts.multiple?
      instance.data.atts.multiple:false
  instance.multiple = multiple

  // initialise value
  let value = instance.data.value?instance.data.value:instance.data.atts.default
  value = _.isUndefined(value)?(instance.multiple?[]:''):value
  instance.value = new ReactiveVar(value)

  // initialise input value
  instance.inputValue = new ReactiveVar('')

  // initialise options and sort them by label
  let options = instance.data.selectOptions?instance.data.selectOptions:[]
  for (let option of options) {
    option.value = _.isString(option)?option:option.value
    option.label = option.label?option.label:option.value
  }
  options = _.sortBy(options, (opt) => {
    return opt.label
  })
  instance.options = options

  // initialise display limit
  const displayLimit = instance.data.atts && instance.data.atts.displayLimit?
      instance.data.atts.displayLimit:20
  instance.displayLimit = displayLimit

  // initialise placeholder
  const placeholder = instance.data.atts && instance.data.atts.placeholder?
      instance.data.atts.placeholder:undefined
  instance.placeholder = new ReactiveVar(placeholder)
})

// when rendered
Template.afAutoComplete_materialize.onRendered(() => {
  const instance = Template.instance()

  // assign label to instance
  instance.$label = instance.$('.auto-complete').parent().find('label')

  // assign hidden to instance
  instance.$hidden = instance.$('.auto-complete-hidden-select')

  // initialise the autocomplete
  const autocomplete = instance.$('.autocomplete')
  const data = {}
  for (let option of instance.options) {
    data[option.label] = null
  }
  M.Autocomplete.init(autocomplete, {
    data,
    limit: instance.displayLimit,
    onAutocomplete(label){
      const selectedOption = _.find(instance.options, option => {
        return option.label === label
      })
      console.log(selectedOption)

      // if multiple
      if (instance.multiple) {

        // get the instance value
        let instanceValue = instance.value.get()

        // push the value onto the instance value
        instanceValue.push(selectedOption.value)

        // set the instance value
        instance.value.set(instanceValue)

        // clear the input element value
        instance.$('.autocomplete').val('')

        // set the instance value to empty string
        instance.inputValue.set('')
      }

      // else - singular
      else {

        // set the instance value
        instance.value.set(selectedOption.value)

        // set the instance value to the label
        instance.inputValue.set(label)
      }
    }
  })

  // when value or placeholder changes
  instance.autorun(() => {

    const value = instance.value.get()
    const placeholder = instance.placeholder.get()
    const hasNoValue = _.isUndefined(value) || _.isEmpty(value)

    // if there is no value and no placeholder
    if(hasNoValue && _.isEmpty(placeholder)) {

      // remove active class from label
      instance.$label.removeClass('active')
    }

    // else - value or placeholder exists
    else {

      // add active class to label
      instance.$label.addClass('active')
    }
  })
})

// helpers
Template.afAutoComplete_materialize.helpers({

  // html element attributes for the text input
  inputAtts() {
    const instance = Template.instance()
    const atts = instance.data.atts

    const result = {
      'class'             : 'autocomplete',
      'type'              : 'text',
    }

    // if singular
    if (!instance.multiple) {

      // get value
      const value = instance.value.get()

      if (!_.isUndefined(value) && !_.isEmpty(value)) {

        // find option for value
        const option = _.find(instance.options, (opt) => {
          return value === opt.value
        })

        // set input value attribute to label
        result.value = option.label
      }
    }

    if (atts.placeholder) {
      result.placeholder = atts.placeholder
    }
    return result
  },

  // html element attributes for the hidden select
  hiddenAtts() {
    const instance = Template.instance()
    const atts = instance.data.atts
    const result = {
      'id'                : atts.id,
      'data-schema-key'   : atts['data-schema-key'],
      'type'              : 'hidden',
      'class'             : 'auto-complete-hidden-select validate'
    };
    if (instance.multiple) {
      result.multiple = 'multiple';
    }
    return result
  },

  // helper to get the options for the hidden select
  options() {
    return Template.instance().options
  },

  // helper for options to determine if they are selected in the hidden select
  selectedOption(option) {

    // get value
    const instance = Template.instance()
    let value = instance.value.get()

    // normalise value as an array
    value = value?value:[]
    const values = _.isArray(value)?value:[value]

    // if value contains this option
    const valueHasOption = _.find(values, (val) => {
      return val === option.value
    })
    if (valueHasOption) {

      // return selected true
      return true
    }
    else {

      // return selected false
      return false
    }
  },

  // true if auto complete is multiple
  multiple() {
    return Template.instance().multiple
  },

  value() {
    return Template.instance().value.get()
  },

  label(value) {
    const instance = Template.instance()
    const option = _.find(instance.options, (opt) => {
      return value === opt.value
    })
    return option.label
  }
})

// events
Template.afAutoComplete_materialize.events({

  // when focus on auto complete input
  'focus .autocomplete'(event, instance) {
    console.log('focus on input')
    // event.preventDefault()
    instance.$label.addClass('active')
  },

  // when input is updated
  'input .autocomplete' (event, instance) {
    // event.preventDefault()

    // get the input value
    const inputValue = event.currentTarget.value
    console.log('inputValue:', inputValue)
    instance.inputValue.set(inputValue)
  },

  // when click on tag icon
  'click .tags i'(event, instance) {
    const value = $(event.currentTarget).data('value')
    console.log('clicked on tag:', value)
    const instanceValue = instance.value.get()
    const newValue = _.without(instanceValue, value)
    instance.value.set(newValue)
  }
})
