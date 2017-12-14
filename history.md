#v 3.5.0
 - Breaking changes to auto complete input to get the schema definition more inline with SimpleSchema and AutoForm.

#v 3.4.0
 - Complete rewrite of auto complete from scratch. Integration with 3rd party plugins is to complex and or restricting for tight integration with auto form.

#v 3.3.3
 - Fixed autocomplete singular default to show label instead of value if there is a label.
 - Fixed autocomplete multiple default
#v 3.3.2
 - Added support for default number

#v 3.3.1
 - Added support for default text, select and auto complete

#v 3.3.0
 - Extended Auto Complete to support Multiple Options [#20](https://github.com/mozfet/meteor-autoform-materialize/issues/20)

#v 3.2.0
 - Added Auto Complete Input Type [#20](https://github.com/mozfet/meteor-autoform-materialize/issues/20)

#v 3.1.1
 - Upgrade to AutoForm 6.2

#v 3.1.0
 - Upgraded to Meteor 1.6

#v 3.0.0 - 3.0.3
 - Remove support for poetic:scss and support MaterializeCSS from NPM directly [#18](https://github.com/mozfet/meteor-autoform-materialize/issues/18)
 - Fixed bugs on switch [#16](https://github.com/mozfet/meteor-autoform-materialize/issues/16)
 - Improvement of tutorials [#19](https://github.com/mozfet/meteor-autoform-materialize/issues/19)

#v 2.1.1
 - Made arrays prettier using icons [#17](https://github.com/mozfet/meteor-autoform-materialize/issues/17)

#v 2.1.0
 - Refactored to support MaterializeCSS as npm package

#v 2.0.20 - 2.0.24
 - Fixed flowtext

#v 2.0.19
 - Fixed Switch input type [#16](https://github.com/mozfet/meteor-autoform-materialize/issues/16)

#v 2.0.13 - 2.0.18
 - Added Flowtext input type for mobile friendly pieces of text inline with form and generated using doc values.

#v 2.0.12
 - Fixed reactivity of select-multiple

# v2.0.11
 - Added new modals package to the suite, old package will be sunset.
 - Updated pickatime.

# v2.0.10
 - Fixed pickadate [#15](https://github.com/mozfet/meteor-autoform-materialize/issues/15)
 - use momentjs npm package [#7](https://github.com/mozfet/meteor-autoform-materialize/issues/7)

# v2.0.6 - v2.0.9
 - Fix select-radio-inline [#6](https://github.com/mozfet/meteor-autoform-materialize/issues/6)
 - Fix pickadate label initialisation [#9](https://github.com/mozfet/meteor-autoform-materialize/issues/9)
 - Added initToCurrentTime attribute to pickatime to easily initialise the time picker to the current time [#13](https://github.com/mozfet/meteor-autoform-materialize/issues/13)
 - Fixed pickatime and pickadate examples in readme [#12](https://github.com/mozfet/meteor-autoform-materialize/issues/12)
 - Fixed select and select multiple labels [#14](https://github.com/mozfet/meteor-autoform-materialize/issues/14)

# v2.0.5
  - Address issue [#5](https://github.com/mozfet/meteor-autoform-materialize/issues/5) by adding pickatime input type

# v2.0.4
  - It works on Atmosphere and in packages folder!
  - HTML imports no longer an issue... probably due to use of imports folder

# v2.0.1 - v2.0.3
  - It works in playground using packages folder, but not when its published to atmosphere!
  - In playground Server is picking up html imports!
  - Cannot find where server is loading the package ... $#%!
  - Renamed src folder to imports folder - now nothing works! ... great...

# v2.0.0
  - ES6 Support
  - Fixes [#3](https://github.com/mozfet/meteor-autoform-materialize/issues/3)

# v1.2.0
  - Fixes [#2](https://github.com/mozfet/meteor-autoform-materialize/issues/2)
  - Minor version bump times two to skip previous faulty deployments

# v1.0.2
 - Add support for NoUiSlider

# v1.0.1
 - Add support for AutoForm 6.0.0

# v0.0.25
 - Refactoring by @Chun-Yang

# v0.0.22
 - Fixes #48 (thanks to @jholl)

# v0.0.21
 - Fixes #43

# v0.0.20
 - Lots of fixes (haven't tracked the bugs numbers this time...)

Thanks to @coniel for his contribution

# v0.0.19

- Fix #18 (see [playground](http://autoform-materialize-playground.meteor.com/))
- Fix #29 (thanks to @coniel)
- Fix #22 (thanks to @Chun-Yang)
- Fix #26 (thanks to @Chun-Yang  ,see [playground](http://autoform-materialize-playground.meteor.com/))

# 0.0.18

- Fix #14
- Fix #15
- Fix #16

# 0.0.17

Add the `invalid` class when needed. Fix #13

*This does not work for select and pickadate: PR welcome*

# 0.0.16

Support for select-multiple, fixing #10

# 0.0.15

Fix for #8

# 0.0.14

Updated autoform to 5.1.1

# 0.0.13

Fix for checkboxes and radios labels. Fix #8

# 0.0.12
# 0.0.11

Bug fix for #7

# 0.0.10

Added id to switch label. Useful for end-to-end testing

# 0.0.9

Merged @rteslaru pull-request for sliders

# 0.0.8

Fixes for compatibility with aldeed:autoform@5.0.0
Added materializecss icons for afArrayField fixing #3

# 0.0.7

Updated dependency to aldeed:autoform@5.0.0

# 0.0.6

Fixed switch `trueValue` and `falseValue` again

# 0.0.5

Fixed switch `trueValue` and `falseValue`

# 0.0.4

Updated documentation.

Upgraded pickadate component to work like [aldeed:autoform-bs-datetimepicker](https://github.com/aldeed/meteor-autoform-bs-datetimepicker)

# 0.0.3

Fixes for select elements.

# 0.0.2

Fixes for checkboxes and radio buttons.
Fixes for switch component.

You can now specify the `trueValue` and `falseValue` for the switch.

# 0.0.1

First release: basic support for materialize forms. Also support **pickadate** and **switch**
