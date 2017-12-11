# Meteor Autoform Materialize templates #

[Materialize-css](http://materializecss.com/) styled forms for use with [aldeed:autoform](https://github.com/aldeed/meteor-autoform).

> **Whats New(ish)** Auto Complete (Single and Multiple), Responsive Text, Timepicker, Improved arrays in forms

> **Thank You** This suite of packages is maintained by [ExpertBox.com](https://www.ExpertBox.com/home) as a thank you to the Open Source community.

> **Cash for Issues** We will pay you cash to close issues on this suite of projects! See contributions section below for info.

> **Dependancies** Version 3.3.1 of this package was manual smoke tested and seemed to work ok on Playground 3.3.1 on 11 Dec 2017 using Meteor 1.6, Simple Schema 0.5, Materialize Autocomplete 1.0.7, Autoform 6.2.0, Materialize CSS 0.100.2, and Autoform Materialize Modals 1.1.2.

> **Shiny Modals** Want forms in modals? See [mozfet:meteor-autoform-materialize-modals](https://github.com/mozfet/meteor-autoform-materialize-modals).

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
6. copy fonts folder from `/node-modules/materialize-css/dist/fonts` to '/public'. Or alternatively use a CDN; if you manage to get the CDN working, please let us know how so we can add it here.

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

autoCompleteDisplayLimit: {
 type: String,
 optional: true,
 label: 'Auto Complete With Display Limit of 3',
 allowedValues: ['Alpha', 'Animal', 'Always', 'Anytime'],
 autoform: {
   type: 'autocomplete',
   autoComplete: {
     displayLimit: 3
   }
 }
},

autoCompleteMultipleInitialized: {
 type: Array,
 label: 'Auto Complete Multiple Initialized',
 autoform: {
   type: 'autocomplete',
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
   autoComplete: {
     displayLimit: 3,
     multiple: true,
     minSize: 1, // for some unknown reason simple schema min is not propaged to auto complete input, thus we define it here
     maxSize: 3  // for some unknown reason simple schema max is not propaged to auto complete input, thus we define it here
   }
 }
},
'autoCompleteMultipleInitialized.$': {
   type: String
}
```

### NoUiSlider support ##

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
You can add a default value to a select, text or autocomplete (more coming soon) input in the schema.
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

## Contributors
If you use this package and find it useful, why not help improve it? We want your feature requests, bug reports, and pull requests.

> **Cash for Issues** We will pay you to close issues on this suite! You pick your own issues, set your own place and time, you do it at your own pace, you make an estimate for your own work, and set your own price (be gentle please, we are a small startup, Ts&Cs apply). As long as it works, not break anything else, and looks good, we are happy. Payments are made to your PayPal account after pull request is approved. Interested? Please drop us a mail at info@expertbox.com.
