# Meteor Autoform Materialize templates #

[Materialize-css](http://materializecss.com/) styled forms for use with [aldeed:autoform](https://github.com/aldeed/meteor-autoform).

> **SASS** The poetic:materialize-scss package is no longer maintained and preventing users from upgrading to newer versions of fourseven:scss package. This package no longer supports poetic:materialize-scss. If you need SASS support, please see installation instructions for Materialize-css on Meteor using NPM (below).

> **Dependancies** This package has been tested in the playground using Meteor 1.5.1, AutoForm 6.2.0 and Materialize-css 0.100.0.

> **Revamped Pickatime** The Materialize team introduced a timepicker for materialize! See below how to use!

> **Shiny Modals** Want forms in modals? See [mozfet:meteor-autoform-materialize-modals](https://github.com/mozfet/meteor-autoform-materialize-modals).

> **Reponsive Text** In some case you just want to display a piece of text, instead of asking the user to input something; introducing cleartext support from Materialize CSS; see usage below.

## Install Materialize-css

### Install Materialize-css (CSS only) using Atmosphere ###

```
meteor add materialize:materialize
```
### Install Materialize-css (CSS & SASS) using NPM ###

1. install dependancies
```
$ meteor npm install hammerjs --save
$ meteor npm install materialize-css --save
$ meteor add fourseven:scss
```
2. create init script to import JavaScript in file `/imports/startup/client/materialize.js`
```
import 'hammerjs';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/extras/noUISlider/nouislider.js';
```
3. import init script in file `/imports/startup/client/index.js`
```
import 'materialize.js'
```
4. import SASS in file `/client/main.scss`
```
@import "../node_modules/materialize-css/sass/components/_color.scss";

$primary-color: color("blue", "base") !default;
$primary-color-light: color("blue", "lighten-4") !default;
$primary-color-dark: color("blue", "darken-4") !default;
$secondary-color: color("orange", "lighten-1") !default;
$success-color: color("green", "base") !default;
$error-color: color("red", "base") !default;
$link-color: color("light-blue", "darken-1") !default;

@import "../node_modules/materialize-css/sass/materialize.scss";
```
5. copy fonts folder from `/node-modules/materialize-css/dist/fonts` to '/public'

## Install Autoform-Materialize ##

1. `meteor add mozfet:autoform-materialize`
2. In a client file (ex: `/imports/startup/client/autoform.js`)
  ```
  AutoForm.setDefaultTemplate('materialize');
  ```
/OR/ Install by cloning the github projects from this theme suite into your project's /packages folder.

## This package is part of a suite ##
- [mozfet:meteor-autoform-materialize](https://github.com/mozfet/meteor-autoform-materialize)
- [mozfet:meteor-autoform-materialize-modals](https://github.com/mozfet/meteor-autoform-materialize-modals)
- [mozfet:meteor-autoform-nouislider](https://github.com/mozfet/meteor-autoform-nouislider)
- [mozfet:meteor-autoform-medium](https://github.com/mozfet/meteor-autoform-medium)
- [mozfet:materialize-icons](https://github.com/mozfet/meteor-materialize-icons)
- [mozfet:meteor-autoform-materialize-playground](https://github.com/mozfet/meteor-autoform-materialize-playground)

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
    label: 'Pick a time',
    autoform: {
      type: 'pickatime',      
      timepickerOptions: {
        default: 'now',       // Set default time
        fromnow: 0,           // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false,    // Use AM/PM or 24-hour format
        donetext: 'OK',       // text for done-button
        cleartext: 'Clear',   // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false,     // automatic close timepicker
        ampmclickable: true,  // make AM PM clickable        
      }
    }
  }
});
```

Note that when using PickATime with an initialised value from a doc, that the default time and fromnow is overwritten with the value from the doc.

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
