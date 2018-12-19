import { Template } from 'meteor/templating'
import { AutoForm } from 'meteor/aldeed:autoform'
import { _ } from 'meteor/underscore'
import './pickadate.html'
import moment from 'moment'

const DATE_FORMAT_PICKER = 'd mmmm yyyy'
const DATE_FORMAT_STRING = 'YYYY-MM-DD' // this is the format of string formatted dates
const DATE_FORMAT_DISPLAY = 'D MMMM YYYY'

AutoForm.addInputType('pickadate', {
  template: 'afPickadate',
  valueIn: function(val, atts) {
    // console.log(`valueIn ${val}:`, atts)
    // console.log(`valueIn type ${typeof val}`)
    let converted = null

    // if empty
    if (_.isNull(val) || _.isUndefined(val) || val === '') {
      // console.log('convert from empty')
    }

    // else - not empty - if string
    else if (_.isString(val)) {
      // console.log('convert from string')
      converted = moment(val, DATE_FORMAT_STRING).format(DATE_FORMAT_DISPLAY)
    }

    // else - not string or empty - if date
    else if (_.isDate(val)){
      // console.log('convert from date')
      converted = moment(val).format(DATE_FORMAT_DISPLAY)
    }

    // else - not supported
    else {
      // console.log('input type not supported')
    }

    // console.log('valueIn converted', converted)
    return converted
  },

  // default value out is converted from display format to string format
  valueOut: function() {
    // console.log(`valueOut this`, this)
    const value = this.val()
    // console.log(`valueOut`, value)
    if (value) {
      const result = moment(value, DATE_FORMAT_DISPLAY)
          .format(DATE_FORMAT_STRING)
      // console.log('valueOut', result)
      return result
    } else {
      return null
    }
  },

  // convert from display string to number and date types
  valueConverters: {

    // convert date string to number
    'number': function (val) {
      if (_.isString(val)) {
        return moment(val, DATE_FORMAT_STRING).unix()
      } else {
        return val
      }
    },

    // convert date string to date object
    'date': function (val) {
      if (_.isString(val)) {
        return moment(val, DATE_FORMAT_STRING).toDate()
      } else {
        return val
      }
    }
  },
  contextAdjust: function(context) {
    if (context.atts.timezoneId) {
      context.atts["data-timezone-id"] = context.atts.timezoneId
    }
    delete context.atts.timezoneId
    return context
  }
})

Template.afPickadate.onRendered(() => {
  const instance = Template.instance();
  // console.log('pickadate instance.data', instance.data)

  if (instance.data.value) {
    instance.$('input').parent().find('label').addClass('active')
  }

  // init pickadate
  const userOptions = instance.data.atts.pickerOptions || {}
  const options = _.defaults(userOptions, {
    format: DATE_FORMAT_PICKER,
    autoClose: true
  })

  // if data min is a date
  if (instance.data.min instanceof Date) {

    // set picker min date
    options.minDate = instance.data.min
  }

  // if data max is a date
  if (instance.data.max instanceof Date) {

    // set picker max date
    options.maxDate = instance.data.max
  }

  // if container is specified
  // console.log('options.container', typeof options.container)
  if (typeof options.container === 'string') {

    const q = $(options.container)
    options.container = q
  }

  // init datepicker
  const input = instance.$('input')
  M.Datepicker.init(input, options)
})

Template.afPickadate.helpers({
  atts() {
    const instance = Template.instance()
    const atts = _.clone(instance.data.atts)
    delete atts.pickerOptions
    return atts
  }
})
