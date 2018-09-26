/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './afFormGroup.html';

Template.afFormGroup_materialize.helpers({
    addInputField: function() {
        var result, skipInputType, type;
        skipInputType = [
            'checkbox',
            'checkbox-group',
            'boolean-checkbox',
            'flowtext',
            'select-radio',
            'select-checkbox-inline',
            'select-radio-inline',
            'boolean-radios',
            'toggle',
            'switch'
        ];
        type = AutoForm.getInputType(this);
        result = !_.contains(skipInputType, type);
        return result;
    },
    skipLabel: function() {
        var result, skipLabelTypes, type;
        skipLabelTypes = [
            'medium',
            'checkbox',
            'checkbox-group',
            'boolean-checkbox',
            'boolean-radios',
            'flowtext',
            'select-radio',
            'select-checkbox-inline',
            'select-radio-inline',
            'boolean-radio',
            'toggle',
            'switch'
        ];
        type = AutoForm.getInputType(this);
        result = this.skipLabel || _.contains(skipLabelTypes, type);
        return result;
    }
});

Template.afFormGroup_materialize.rendered = function() {
    var formId;
    formId = AutoForm.getFormId();
    this.autorun((function(_this) {
        return function() {
            var value = AutoForm.getFieldValue(_this.data.name, formId);
            var inputValue = AutoForm.getInputValue(_this.find('input'));
            var type = AutoForm.getInputType(_this.data);
            var placeholder = _this.data.afFieldInputAtts.placeholder;

            // do not auto activate labels for the following types
            var skipActiveLabelTypes = [
                'autocomplete',
                'checkbox',
                'checkbox-group',
                'boolean-checkbox',
                'flowtext',
                'select',
                'select-multiple',
                'select-radio',
                'select-checkbox-inline',
                'select-radio-inline',
                'boolean-radio',
                'toggle',
                'switch'
            ];

            // always activate labels for the following types
            var alwaysActiveLabelTypes = [
              'noUiSlider2',
              'file',
              'fileUpload',
              'date'
            ];

            // if the input always has an active label
            if (_.contains(alwaysActiveLabelTypes, type)) {

              // activate the label
              return _this.$('.input-field > label:not(:focus)').addClass('active');
            }

            // else, if the input is an active type
            else if (!_.contains(skipActiveLabelTypes, type)) {

              // if value or inputValue number 0 or placeholder
              if (!!value || !!inputValue || inputValue === 0 || !!placeholder)
              {

                // activate the label
                return _this.$('.input-field > label:not(:focus)').addClass('active');

              // else
              } else {

                // deactivate the label
                return _this.$('.input-field > label:not(:focus)').removeClass('active');
              }
            }
        };
    })(this));
};
