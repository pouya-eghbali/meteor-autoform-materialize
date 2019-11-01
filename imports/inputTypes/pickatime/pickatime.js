import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { Blaze } from 'meteor/blaze'
import moment from 'moment'
import './pickatime.html'

const TIME_FORMAT = 'HH:mm'

// add autoform input
AutoForm.addInputType('pickatime', {
  template: 'afInputPickatime_materialize',
  valueOut: function () {
    return this.val()
  }
})

// when created
Template.afInputPickatime_materialize.onCreated(() => {
  const instance = Template.instance()

  // if value was provided
  let value;
  if (instance.data.value) {

    // use provided value as value
    value = instance.data.value
  }

  // initialise value
  instance.value = new ReactiveVar(value)
})

// when rendered
Template.afInputPickatime_materialize.onRendered(() => {
  const instance = Template.instance()

  // get value
  const value = instance.value.get()

  // initialise timepicker
  let options
  if (instance.data.atts.pickerOptions) {
    options = _.clone(instance.data.atts.pickerOptions)
    if (value) {
      options.defaultTime = value
      instance.$('input').val(value)
      instance.$('input').parent().find('label').addClass('active')
    }
  }
  else {
    options = {}
    if (value) {
      options.defaultTime = value
      instance.$('input').val(value)
      instance.$('input').parent().find('label').addClass('active')
    }
  }
  options.twelveHour = false
  // console.log('timepicker options', options)
  const input = instance.$('.timepicker')
  M.Timepicker.init(input, options)

  // use jquery to detect the change since nothing else seems to work...
  instance.$('.timepicker').on('change', function () {
    const value = instance.$('.timepicker').val()
    instance.value.set(value)
    if (value) {
      instance.$('.timepicker').parent().find('label').addClass('active')
    }
    else {
      instance.$('input').parent().find('label').removeClass('active')
    }
  })
})

// helpers
Template.afInputPickatime_materialize.helpers({
  atts() {
    const instance = Template.instance()
    const atts = instance.data.atts
    const val = instance.value.get()
    return {
      'id': atts.id,
      'data-schema-key': atts['data-schema-key'],
      'data-value': val,
      'value': val
    }
  },
  value() {
    const instance = Template.instance()
    return instance.value.get()
  },
  id() {
    const instance = Template.instance()
    return instance.id
  }
})
