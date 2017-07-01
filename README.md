# Meteor Autoform Materialize templates #
Adds [materialize](http://materializecss.com/) templates for autoform.

> **Important** This package supports Meteor 1.4, AutoForm 6.0.0 and ES6. Older versions of Meteor and AutoForm are no longer supported.

> **Shiny Modals** Introducing the new AutoForm Materialize Modals module, rewritten from scratch! Learn more at [mozfet:meteor-autoform-materialize-modals](https://github.com/mozfet/meteor-autoform-materialize-modals). The old modals package still works, however will not be maintained going forward. The new package is not backward compatible with the old package and client code will need to change to make use of the new package.

> **Mobile friendly text** In some case you just want to display a piece of text, instead of asking the user to input something; introducing cleartext support from Materialize CSS; see usage below.

## Setup ##

1. `meteor add mozfet:autoform-materialize`
2. In a client file (ex: `/client/config/autoform.js`)
  ```
  AutoForm.setDefaultTemplate('materialize');
  ```
/OR/ Install by cloning the github projects from this theme suite into your project's /packages folder.

You must add Materialize CSS and JavaScript yourself. Some packages can help:

- [materialize:materialize](https://atmospherejs.com/materialize/materialize) `meteor add materialize:materialize@0.98.2`
- [poetic:materialize-scss](https://atmospherejs.com/poetic/materialize-scss) `meteor add poetic:materialize-scss@1.97.6_1`

## This package is part of a suite ##
- [mozfet:meteor-autoform-materialize](https://github.com/mozfet/meteor-autoform-materialize)
- [mozfet:meteor-autoform-materialize-modals](https://github.com/mozfet/meteor-autoform-materialize-modals)
- [mozfet:meteor-autoform-nouislider](https://github.com/mozfet/meteor-autoform-nouislider)
- [mozfet:meteor-autoform-medium](https://github.com/mozfet/meteor-autoform-medium)
- [mozfet:meteor-autoform-materialize-playground](https://github.com/mozfet/meteor-autoform-materialize-playground)

No longer maintained
[mozfet:meteor-autoform-modals-materialize](https://github.com/mozfet/meteor-autoform-modals-materialize)

## Usage and demo ##

You can checkout the [playground](https://github.com/mozfet/meteor-autoform-materialize-playground)

## Additional types ##

### NoUiSlider support ##

To add NoUiSlider (see [the playground](https://github.com/mozfet/meteor-autoform-materialize-playground)):

```
meteor add mozfet:autoform-materialize-nouislider
```

### PickADate ##
Materialize uses [pickadate](https://github.com/amsul/pickadate.js) for date inputs.

You can apply it directly in your template:

```
{{> afFieldInput name="dateField" type="pickadate"}}
```

You can also specify it at the schema level:
```
MySchema = new SimpleSchema({
  dateField: {
    type: Date,
    label: 'Pick a date with options',
    autoform: {
      type: 'pickadate',
      pickadateOptions: {
        closeOnSelect: true,
        closeOnClear: true
      }
    }
  }
});
```

### PickATime ###
You can apply it directly in your template:

```
{{> afFieldInput name="timeField" type="pickatime"}}
```

You can also specify it at the schema level:
```
MySchema = new SimpleSchema({
  timeField: {
    type: String,
    autoform: {
      type: 'pickatime',
      initToCurrentTime: true
    }
  }
});
```

### FlowText ###
You can apply it directly in your template:

```
{{> afFieldInput name="someTextToDisplay" type="flowtext"}}
```

You can also specify it at the schema level:
```
MySchema = new SimpleSchema({
  someTextToDisplay: {
    type: String,
    autoform: {
      type: 'flowtext'      
    }
  }
});
```



#### Choosing a Timezone ####

By default, the field's value will be a `Date` object representing the selected date and time in the browser's timezone (i.e., based on the user's computer time settings). In most cases, you probably want the `Date` object relative to some other timezone that you have previously stored. For example, if the form is setting the start date of an event, you want the date to be relative to the event venue's timezone. You can specify a different IANA timezone ID by adding a `timezoneId` attribute.

```js
{
  date: {
    type: Date,
    autoform: {
      type: "pickadate",
      timezoneId: "America/New_York"
    }
  }
}
```

Or:

```js
{{> afFieldInput name="typeTest" type="pickadate" timezoneId="America/New_York"}}
```

#### Automatic Type Conversions ####

This input type is intended to be used with `type: Date` schema keys, but it also works with other schema types. Here's a list:

* `Date`: Value is stored as a `Date` object representing the selected date and time in the timezone you specified with the `timezoneId` attribute. By default, the timezone is that of the browser (i.e., the user's computer time settings).
* `String`: Value is stored as a string representation of the selected date in ISO format, e.g., "2014-11-25T00:00:00".
* `Number`: Value is stored as the result of calling `getTime()` on the `Date` object (representing the selected date and time in the timezone you specified).
* `Array`: If the schema expects an array of `Date` or `String` or `Number`, the value is converted to a one-item array and stored.

To provide pickadate options, set a `pickadateOptions` attribute equal to a helper that returns the options object.

### Switch ####

You an also use [switches](http://materializecss.com/forms.html#switches)

At the template level:
```
{{> afFieldInput name='dateFieldName' type="switch"}}
```

At the schema level:
```
MySchema = new SimpleSchema({
  booleanFieldName: {
    type: Boolean
    autoform: {
      type:"switch"
    }
  }
});
```

You may specify the `trueLabel` or `falseLabel` options to customize the switch.

At the template level:
```
{{> afFieldInput name='dateFieldName' type="switch" trueLabel="Online" falseLabel="Offline"}}
```

At the schema level:
```
MySchema = new SimpleSchema({
  booleanFieldName: {
    type: Boolean
    autoform: {
      type:"switch"
      trueLabel:"Online"
      falseLabel:"Offline"
    }
  }
});
```
If you need other values than boolean, you may specify the `trueValue` or `falseValue` options to customize the switch.

At the template level:
```
{{> afFieldInput name='dateFieldName' type="switch" trueValue="online" falseValue="offline"}}
```

At the schema level:
```
MySchema = new SimpleSchema({
  booleanFieldName: {
    type: Boolean
    autoform: {
      type:"switch"
      trueValue:"online"
      falseValue:"offline"
    }
  }
});
```

### Input with prepended icon ###
You can add icon to any field like this:
```
{{> afQuickField name='subject' icon='person'}}
```
For blank space in place of icon, just use "none":
```
{{> afQuickField name='subject' icon='none'}}
```

It also works for textarea:
```
{{> afQuickField name='message' type='textarea' icon='person'}}
```
