import { Template } from 'meteor/templating'
import './afFormGroup.html'
import { flattenSchema } from '../../utilities/flattenSchema'

Template.afFormGroup_materialize.helpers({
  fieldType() {
    return AutoForm.getInputType(this)
  },
  safeClass(name) {
    return name.replace(/\./g, '-dot-');
  },
  needsLabel() {
    const type = AutoForm.getInputType(this);
    const noLabelTypes = [
      'file', 'fileUpload'
    ]
    return !noLabelTypes.includes(type)
  },
  colSize(context) {
    return this.afFieldInputAtts.size || 's12'
  },
  getHelp() {
    return (this.afFieldInputAtts.data || {}).help
  },
  addInputField: function () {
    var result, skipInputType, type
    skipInputType = [
      /*'checkbox',
      'checkbox-group',
      'boolean-checkbox',
      'flowtext',
      'boolean-radios',
      'toggle',
      'switch',
      'javascript'*/
    ]
    type = AutoForm.getInputType(this)
    result = !_.contains(skipInputType, type)
    return result
  },
  skipLabel: function () {
    var result, skipLabelTypes, type
    skipLabelTypes = [
      'medium',
      'checkbox',
      'checkbox-group',
      'boolean-checkbox',
      'boolean-radios',
      'flowtext',
      'toggle',
      'switch',
      'javascript'
    ]
    type = AutoForm.getInputType(this)
    result = this.skipLabel || _.contains(skipLabelTypes, type)
    return result
  }
})

Template.afFormGroup_materialize.rendered = function () {
  var formId
  formId = AutoForm.getFormId()

  // do not auto activate labels for the following types
  var skipActiveLabelTypes = [
    'autocomplete',
    'checkbox',
    'checkbox-group',
    'boolean-checkbox',
    'boolean-select',
    'flowtext',
    'select',
    'select-multiple',
    'boolean-radio',
    'toggle',
    'switch',
    'javascript'
  ]

  // always activate labels for the following types
  var alwaysActiveLabelTypes = [
    'select-radio',
    'select-radio-inline',
    'noUiSlider2',
    'file',
    'fileUpload',
    'date'
  ]

  this.autorun((function (_this) {
    return function () {
      var $input = $(`[data-schema-key="${_this.data.name}"]`)
      var value = AutoForm.getFieldValue(_this.data.name, formId, false)
      var inputValue = AutoForm.getInputValue($input[0])
      var type = AutoForm.getInputType(_this.data)
      var placeholder = _this.data.afFieldInputAtts.placeholder || $input.attr('placeholder')

      setTimeout(function () {
        // if the input always has an active label
        if (alwaysActiveLabelTypes.includes(type)) {

          // activate the label
          return $(`[data-schema-key="${_this.data.name}"] + label:not(:focus)`).addClass('active')
        }

        // else, if the input is an active type
        else if (!skipActiveLabelTypes.includes(type)) {

          // if value or inputValue number 0 or placeholder
          if (!!value || !!inputValue || inputValue === 0 || !!placeholder) {

            // activate the label
            return $(`[data-schema-key="${_this.data.name}"] + label:not(:focus)`).addClass('active')

            // else
          } else {

            // deactivate the label
            return $(`[data-schema-key="${_this.data.name}"] + label:not(:focus)`).removeClass('active')
          }
        }
      }, 0)
    }
  })(this))
}
