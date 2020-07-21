import { Template } from "meteor/templating";
import { AutoForm } from "meteor/aldeed:autoform";
import { _ } from "meteor/underscore";
import "./pickadate.html";
import moment from "moment";

const DATE_FORMAT_PICKER = "d mmmm yyyy";
const DATE_FORMAT_STRING = "YYYY-MM-DD"; // this is the format of string formatted dates
const DATE_FORMAT_DISPLAY = "D MMMM YYYY";

AutoForm.addInputType("pickadate", {
  template: "afPickadate",

  // default value out is converted from display format to string format
  valueOut: function () {
    // console.log(`valueOut this`, this)
    if (!this.get(0).value) return null;
    const instance = Blaze.getView(this.get(0)).templateInstance() || {};
    return instance.selectedDate;
  },

  // convert from display string to number and date types
  valueConverters: {
    // convert date string to number
    number: function (val) {
      if (_.isString(val)) {
        return moment(val, DATE_FORMAT_STRING).unix();
      } else {
        return val;
      }
    },

    // convert date string to date object
    date: function (val) {
      if (_.isString(val)) {
        return moment(val, DATE_FORMAT_STRING).toDate();
      } else {
        return val;
      }
    },
  },
  contextAdjust: function (context) {
    if (context.atts.timezoneId) {
      context.atts["data-timezone-id"] = context.atts.timezoneId;
    }
    delete context.atts.timezoneId;
    return context;
  },
});

Template.afPickadate.onRendered(() => {
  const instance = Template.instance();
  // console.log('pickadate instance.data', instance.data)

  if (instance.data.value) {
    instance.$("input").parent().find("label").addClass("active");
  }

  // init pickadate
  const userOptions = instance.data.atts.pickerOptions || {};
  const options = _.defaults(userOptions, {
    format: DATE_FORMAT_PICKER,
    autoClose: true,
  });

  const { onSelect } = options;
  options.onSelect = (date) => {
    instance.selectedDate = date;
    if (onSelect) onSelect(date);
  };

  // if data min is a date
  if (instance.data.min instanceof Date) {
    // set picker min date
    options.minDate = instance.data.min;
  }

  // if data max is a date
  if (instance.data.max instanceof Date) {
    // set picker max date
    options.maxDate = instance.data.max;
  }

  // if container is specified
  // console.log('options.container', typeof options.container)
  if (typeof options.container === "string") {
    const q = $(options.container);
    options.container = q;
  }

  // init datepicker
  const input = instance.$("input");
  M.Datepicker.init(input, options);
  const picker = M.Datepicker.getInstance(input);

  instance.autorun(() => {
    const { value } = Template.currentData();
    if (!value) return;
    picker.setDate(new Date(value));
    input.val(picker.toString());
  });
});

Template.afPickadate.helpers({
  atts() {
    const instance = Template.instance();
    const atts = _.clone(instance.data.atts);
    delete atts.pickerOptions;
    return atts;
  },
});
