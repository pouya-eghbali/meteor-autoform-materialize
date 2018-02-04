# Meteor Autoform Materialize templates #

[Materialize-css](http://materializecss.com/) styled forms for use with [aldeed:autoform](https://github.com/aldeed/meteor-autoform).

> **Important** This package no longer supports the Atmosphere Materialize wrapper package. Please migrate to using the NPM Materialize package. See installation instructions below.

> **Whats New(ish)** Auto Complete, Easy Defaults, Responsive Text, Timepicker

> **Thank You** This suite of packages is maintained by [ExpertBox.com](https://www.ExpertBox.com/home) as a thank you to the Open Source community.

> **Cash for Issues** We will pay you cash to close issues on this suite of projects! See contributions section below for info.

> **Shiny Modals** Want forms in modals? See [mozfet:meteor-autoform-materialize-modals](https://github.com/mozfet/meteor-autoform-materialize-modals).

## Dependancies
Version 3.5.4 of this package was manual smoke tested in Playground 3.5.2 and seemed to work ok using:
+ Chrome Version 62.0.3202.94 (Official Build) (64-bit)
+ Meteor 1.6
+ Simple Schema 0.5 (NPM Package)
+ Materialize CSS 0.100.2 (NPM Package)
+ Autoform 6.2.0 (Atmosphere Package)
+ Autoform Materialize Modals 1.1.5 (Atmosphere Package)
+ FourSeven SCSS 4.5.4 (Atmosphere Package)

# Installation

## Install Materialize CSS (CSS & SASS) using NPM ##

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
3. create scss include paths in file '/scss-config.json'
```
{
  "includePaths": [
    "{}/node_modules/materialize-css/sass/"
  ]
}
```
4. import init script in file `/imports/startup/client/index.js`
```
import 'materialize.js'
```
5. import SASS in file `/client/main.scss`
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
6. copy fonts folder from `/node-modules/materialize-css/dist/fonts` to your Meteor project's ```/public/fonts/roboto``` folder. Or alternatively use a CDN; if you manage to get the CDN working, please let us know how so we can add it here.

## This package is part of a suite ##
- [mozfet:meteor-autoform-materialize](https://github.com/mozfet/meteor-autoform-materialize)
- [mozfet:meteor-autoform-materialize-modals](https://github.com/mozfet/meteor-autoform-materialize-modals)
- [mozfet:meteor-autoform-nouislider](https://github.com/mozfet/meteor-autoform-nouislider)
- [mozfet:meteor-autoform-medium](https://github.com/mozfet/meteor-autoform-medium)
- [mozfet:materialize-icons](https://github.com/mozfet/meteor-materialize-icons)
- [mozfet:meteor-autoform-materialize-playground](https://github.com/mozfet/meteor-autoform-materialize-playground)

## Demo, Examples, Detailed Usage and Smoke Testing ##

Have a look at the [playground](https://github.com/mozfet/meteor-autoform-materialize-playground) for demo, examples, detailed usage and smoke testing.

## Additional types ##

### Auto Complete ###

MaterializeCSS is busy adding support for Auto Complete in V1, however at the time of writing this is not yet supported in a stable release and does not yet support multiple entries in an autocomplete. For this reason this package makes use of a modified hard fork of [materialize-autocomplete](https://github.com/icefox0801/materialize-autocomplete), and will do so until the build in MaterializeCSS support for this feature is more mature.

In your schema definition (see playground for extensive list of examples):
```
autoCompleteSingular: {
  type: String,
  optional: true,
  label: 'Auto Complete Singular',
  allowedValues:  ['Alpha', 'Animal', 'Brave', 'Butter', 'Better', 'Charlie'],
  autoform: {
    type: 'autocomplete'
  }
},

autoCompleteSingularDisplayLimit: {
 type: String,
 optional: true,
 label: 'Auto Complete With Placeholder and Display Limit of 3',
 allowedValues: ['Alpha', 'Animal', 'Always', 'Anytime'],
 autoform: {
   type: 'autocomplete',
   placeholder: 'Type something',
   displayLimit: 3
 }
},

autoCompleteMultipleMinMaxDefault: {
  type: Array,
  label: 'Auto Complete Multiple with count between 1 and 3',
  minCount: 1,
  maxCount: 3,
  autoform: {
    type: 'autocomplete',
    multiple: true,
    options: () => {
      return [
        {
          label: 'Alpha',
          value: 'ALPHA'
        },
        {
          label: 'Animal',
          value: 'ANIMAL'
        },
        {
          label: 'Always',
          value: 'ALWAYS'
        },
        {
          label: 'Anytime',
          value: 'ANYTIME'
        },
        {
          label: 'Bravo',
          value: 'BRAVO'
        },
        {
          label: 'Bedtime',
          value: 'BEDTIME'
        }
      ];
    },
    displayLimit: 3,
    default: ['ALPHA', 'ANIMAL']
  }
},
'autoCompleteMultipleMinMax.$': {
    type: String,
    allowedValues: ['ALPHA', 'ANIMAL', 'ALWAYS', 'ANYTIME', 'BRAVO', 'BEDTIME']
}
```

### NoUiSlider ##

To add NoUiSlider (see [the playground](https://github.com/mozfet/meteor-autoform-materialize-playground)):

```
meteor add mozfet:autoform-materialize-nouislider
```

You can apply it directly in your template:

```
{{> afFieldInput name="dateField" type="pickadate"}}
```

You can also specify it at the schema level:
```
TODO
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

### Default Values ###
You can easily add a default value to a select, text, number, autocomplete (more coming soon) input in the schema.
```
selectWithDefault: {
  type: String,
  allowedValues: ['VALUE1', 'VALUE2'],
  autoform: {
    type: 'select',
    default: 'VALUE1'
  }
},

stringDefault: {
  type: String,
  max: 1000,
  label: 'Simple text field with default value',
  autoform: {
    default: 'default text'
  }
}
```

# Contributors
If you use this package and find it useful, why not help improve it? We want your feature requests, bug reports, and pull requests.

> **Cash for Issues** We will pay you to close issues on this suite! You pick your own issues, set your own place and time, you do it at your own pace, you make an estimate for your own work, and set your own price (be gentle please, we are a small startup, Ts&Cs apply). As long as it works, not break anything else, and looks good, we are happy. Payments are made to your PayPal account after pull request is approved. Interested? Please drop us a mail at info@expertbox.com.
