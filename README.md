# Meteor Autoform Materialize templates

[Materialize-css](http://materializecss.com/) styled forms for use with [aldeed:autoform](https://github.com/aldeed/meteor-autoform).

> **Important** Due to [open pull request 6014](https://github.com/Dogfalo/materialize/pull/6014) which solves a bug with multiple select in MaterializeCSS V1.0.0, it is not recommended to install Materialize V1.0.0 using npm, but to use git to clone and merge the pull request manually instead.

To fix multiple select, remove "materialize-css": "^1.0.0" dependancy from package.json, navigate to node_modules folder of your project
```
$ rm -rf materialize-css
$ git clone https://github.com/Dogfalo/materialize.git
$ mv materialize materialize-css
$ cd materialize-css
$ git fetch origin +refs/pull/6014/merge
$ git checkout FETCH_HEAD
```

> **Thank You** This suite of packages is maintained by [ExpertBox.com](https://www.ExpertBox.com/home) as a thank you to the Open Source community.

> **Drag and Drop Sortable Arrays** Demonstrate your organizational skills by drag and drop sorting arrays!

> **Whats New(ish)** MaterializeCSS v1 support, File Uploads with Meteor-Files, Auto Complete, Easy Defaults, Responsive Text, Timepicker

> **Cash for Issues** We will pay you cash to close issues on this suite of projects! See contributions section below for info.

> **Shiny Modals** Want forms in modals? See [mozfet:meteor-autoform-materialize-modals](https://github.com/mozfet/meteor-autoform-materialize-modals).

## History
Version 5.0.0 contains breaking changes to DatePicker and TimePicker. Please see []()

See [history.md](/history.md) for an overview of changes per version.

## Compatability
Version 5.0.1 of this package was manual smoke tested in Playground 5.1.2 with:
+ macOS Majave v10.14.1
+ Chrome v62.0.3497.81 (Official Build) (64-bit)
+ Meteor v1.8.1
+ Simple Schema v1.4.3 (NPM Package)
+ Materialize CSS v1.0.0 (NPM Package)
+ Hammerjs v2.0.8 (NPM Package)
+ Aldeed Autoform v6.3.0 (Atmosphere Package)
+ Aldeed Collection2 v2.1.2 (Atmosphere Package)
+ Mozfet Autoform Materialize Modals v4.0.2 (Atmosphere Package)
+ Mozfet Autoform Materialize Files v2.1.0 (Atmosphere Package)
+ Mozfet Autoform Medium v2.0.4 (Atmosphere Package)
+ Mozfet Material Icons v1.1.0 (Atmosphere Package)
+ Ostrio Files 1.10.2 (Atmosphere Package)
+ FourSeven SCSS 4.9.0 (Atmosphere Package)
+ NoUiSlider 9.2.0 (NPM Package)
+ Wnumb 1.1.0 (GIT Repo)
+ Material Design Icons Fonts 3.0.1 (Atmosphere)

# Installation

## Install Materialize CSS (CSS & SASS) using NPM ##

1. install required dependancies
```
$ meteor npm install hammerjs --save
$ meteor npm install materialize-css --save
$ meteor add fourseven:scss
```

2. create init script to import JavaScript in file `/imports/startup/client/materialize.js`
```
<<<<<<< Updated upstream
import 'hammerjs';
=======
>>>>>>> Stashed changes
import 'materialize-css/dist/js/materialize.js';
```

3. create scss include paths in file '/scss-config.json'
```json
{
  "includePaths": [
    "{}/node_modules/materialize-css/sass/"
  ]
}
```
4. import init script in file `/imports/startup/client/index.js`
```javascript
import 'materialize.js';
```
5. import SASS in file `/client/main.scss`
```
@import "../node_modules/materialize-css/sass/materialize.scss";
@import "{mozfet:autoform-materialize}/style.scss";
```

## Install Autoform Materialize
Using the command line in the project folder:
```
$ meteor add mozfet:autoform-materialize
```

Optionally add the extras (as needed)
```
$ meteor add mozfet:autoform-materialize-modals
$ meteor add mozfet:autoform-medium
$ meteor add mozfet:autoform-materialize-nouislider
$ meteor add mozfet:autoform-materialize-nouislider2
$ meteor add mozfet:autoform-materialize-files
```

In client startup code, e.g. project/imports/startup/client/autoform.js
```js
<<<<<<< Updated upstream
import { AutoForm } from 'meteor/aldeed:autoform';
AutoForm.setDefaultTemplate('materialize');
=======
import { AutoForm } from 'meteor/aldeed:autoform'
AutoForm.setDefaultTemplate('materialize')
>>>>>>> Stashed changes
```

In client view js, e.g. project/imports/gui/views/insertBook.js
```js
Books = new Mongo.Collection("books");
Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  author: {
    type: String,
    label: "Author"
  }
}, { tracker: Tracker }));
```

In client view html, e.g. project/imports/gui/views/insertBook.html
```html
<template name="insertBookForm">
  {{> quickForm collection="Books" id="insertBookForm" type="insert"}}
</template>
```

See [Autoform documentation](https://github.com/aldeed/meteor-autoform) for more form examples.

## This package is part of a suite ##
- [mozfet:meteor-autoform-materialize](https://github.com/mozfet/meteor-autoform-materialize)
- [mozfet:meteor-autoform-materialize-modals](https://github.com/mozfet/meteor-autoform-materialize-modals)
- [mozfet:meteor-autoform-nouislider](https://github.com/mozfet/meteor-autoform-nouislider)
- [mozfet:meteor-autoform-nouislider2](https://github.com/mozfet/meteor-autoform-nouislider2)
- [mozfet:meteor-autoform-medium](https://github.com/mozfet/meteor-autoform-medium)
- [mozfet:meteor-autoform-file](https://github.com/mozfet/meteor-autoform-file)
- [mozfet:materialize-icons](https://github.com/mozfet/meteor-materialize-icons)
- [mozfet:meteor-autoform-materialize-playground](https://github.com/mozfet/meteor-autoform-materialize-playground)

## Demo, Examples, Detailed Usage and Smoke Testing ##
Have a look at the [playground](https://github.com/mozfet/meteor-autoform-materialize-playground) for demo, examples, detailed usage and smoke testing.

## Additional types ##

### Auto Complete ###

MaterializeCSS is busy adding support for Auto Complete in V1, however at the time of writing this is not yet supported in a stable release and does not yet support multiple entries in an autocomplete. For this reason this package makes use of a modified hard fork of [materialize-autocomplete](https://github.com/icefox0801/materialize-autocomplete), and will do so until the build in MaterializeCSS support for this feature is more mature.

In your schema definition (see playground for extensive list of examples):
```js
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

There are two stylings of nouislider because the styling provided by Materialize does not work well with larger tooltips. In general the first styling is good enough, but the second styling works better with large tooltips. Both styles can be used within the same project.

For examples see [the playground](https://github.com/mozfet/meteor-autoform-materialize-playground/tree/master/imports/ui/components/slidersExample)). For more information on

So far the focus was on getting horizontal sliders to work, no attention was given to vertical sliders as form components... See the [noUiSlider docs](https://refreshless.com/nouislider/) for more information on the options.

NoUiSlider is an optional extension of this package. To add NoUiSlider:
```
$ meteor add mozfet:autoform-materialize-nouislider
$ meteor add mozfet:autoform-materialize-nouislider2
```

mozfet:autoform-materialize-nouislider is as close as possible to that published by MaterializeCSS; however this includes an out of date version of noUiSlider and also includes wNumb.

mozfet:autoform-materialize-nouislider2 makes use of SASS styling and the latest version of noUiSlider and does no include wNumb; import the style in your package in a ```.sass``` or ```.scss``` file for it to work.
```
@import "{mozfet:autoform-materialize-nouislider2}/style.scss";
```

At the schema level:
```js
const schema = new SimpleSchema({
  'basic': {
    type: Number,
    min: 10,
    max: 26,
    autoform: {
      type: 'noUiSlider',
      noUiSliderOptions: {
        format: wNumb({
          decimals: 0
        })
      }
    }
  },
  'rangeArrayPips': {
    type: Array,
    optional: true,
    autoform: {
      type: 'noUiSlider',
      step: 2,
      noUiSliderOptions: {
        start: [700,8000],
        connect: true,
        range: {
          'min': [0],
        	'10%': [500,500],
        	'50%': [4000,1000],
        	'max': [10000]
        },
        pips: {
          mode: 'range',
          density: 3
        }
      }
    }
  },
  'rangeArrayPips.$': {
    type: Number
  },
  'formattedTooltips': {
    type: String,
    optional: true,
    label: 'Large tooltip with custom formatting',
    autoform: {
      type: 'noUiSlider2',
      // labelLeft: 'LeftLabel',
      // labelRight: 'RightLabel',
      noUiSliderOptions: {
        start: '45m',
        step: 5,
        tooltips: true,
        orientation: 'horizontal',
        range: {
          min: 0,
          max: 12*60
        },
        format: {
          to: function ( value ) {
            const minutes = Math.round(value)
            const human = moment.duration(minutes, 'minutes')
                .format('h[h]mm[m]')
            // console.log(`to ${value} human ${human}`)
            return human
          },
          from: function ( value ) {
            let hours = value.match(/^\d{1,2}h/g)
            hours = Number(hours?hours[0].slice(0, -1):'0')
            let mins = value.match(/\d{1,2}m$/g)
            mins = Number(mins?mins[0].slice(0, -1):'0')
            const result = hours*60 + mins
            // console.log(`from ${value} to ${result}`)
            return result
          }
        }
      }
    }
  }
}, {tracker: Tracker})
```

### PickADate ##

Materialize uses [pickadate](https://github.com/amsul/pickadate.js) for date inputs.

You can apply it directly in your template:

```html
{{> afFieldInput name="dateField" type="pickadate"}}
```

You can also specify it at the schema level:
```js
MySchema = new SimpleSchema({
  dateField: {
    type: Date,
    label: 'Pick a date with options',
    autoform: {
      type: 'pickadate',
      pickerOptions: {
        container: '#modalContainer'
      }
    }
  },
  dateField: {
    type: String,
    label: 'Pick a string date with options',
    autoform: {
      type: 'pickadate',
      pickerOptions: {
        container: '#modalContainer'
      }
    }
  }
})
```

### PickATime ###

You can apply it directly in your template:

```javascript
{{> afFieldInput name="timeField" type="pickatime"}}
```

You can also specify it at the schema level:
```js
MySchema = new SimpleSchema({
  timeField: {
    type: String,
    label: 'Pick a time',
    autoform: {
      type: 'pickatime',
      pickerOptions: {
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
})
```

Note that when using PickATime with an initialised value from a doc, that the default time and fromnow is overwritten with the value from the doc.

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

```html
{{> afFieldInput name="typeTest" type="pickadate" timezoneId="America/New_York"}}
```

#### Automatic Type Conversions ####

This input type is intended to be used with `type: Date` schema keys, but it also works with other schema types. Here's a list:

* `Date`: Value is stored as a `Date` object representing the selected date and time in the timezone you specified with the `timezoneId` attribute. By default, the timezone is that of the browser (i.e., the user's computer time settings).
* `String`: Value is stored as a string representation of the selected date in ISO format, e.g., "2014-11-25T00:00:00".
* `Number`: Value is stored as the result of calling `getTime()` on the `Date` object (representing the selected date and time in the timezone you specified).
* `Array`: If the schema expects an array of `Date` or `String` or `Number`, the value is converted to a one-item array and stored.

To provide pickadate options, set a `pickadateOptions` attribute equal to a helper that returns the options object.

### FlowText ###

You can apply it directly in your template:

```html
{{> afFieldInput name="someTextToDisplay" type="flowtext"}}
```

You can also specify it at the schema level:
```js
MySchema = new SimpleSchema({
  someTextToDisplay: {
    type: String,
    autoform: {
      type: 'flowtext'
    }
  }
});
```

### Switch ####

You an also use [switches](http://materializecss.com/forms.html#switches)

At the template level:
```html
{{> afFieldInput name='dateFieldName' type="switch"}}
```

At the schema level:
```js
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
```html
{{> afFieldInput name='dateFieldName' type="switch" trueLabel="Online" falseLabel="Offline"}}
```

At the schema level:
```js
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
```html
{{> afFieldInput name='dateFieldName' type="switch" trueValue="online" falseValue="offline"}}
```

At the schema level:
```js
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

### File Upload ###

Upload files, with preview, using [Meteor Files](https://github.com/VeliovGroup/Meteor-Files).
```
fileUpload: {
  type: String,
  optional: true,
  autoform: {
    type: 'fileUpload',
    collection: 'Files'
  }
}
```

Alternatively, see [mozfet:autoform-materialize-file](https://github.com/mozfet/meteor-autoform-file)

### Input with prepended icon ###

You can add icon to any field like this:
```html
{{> afQuickField name='subject' icon='identity'}}
```
For blank space in place of icon, just use "none":
```html
{{> afQuickField name='subject' icon='none'}}
```

It also works for textarea:
```html
{{> afQuickField name='message' type='textarea' icon='identity'}}
```

### Default Values ###

You can easily add a default value to a select, text, number, autocomplete (more coming soon) input in the schema.
```js
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

# Contributions
If you use this package and find it useful, why not help improve it? We want your feature requests, bug reports, and pull requests.

> **Cash for Issues** We will pay you to close issues on this suite! You pick your own issues, set your own place and time, you do it at your own pace, you make an estimate for your own work, and set your own price (be gentle please, we are a small startup, Ts&Cs apply). As long as it works, not break anything else, and looks good, we are happy. Payments are made to your PayPal account after pull request is approved. Interested? Please drop us a mail at info@expertbox.com.
