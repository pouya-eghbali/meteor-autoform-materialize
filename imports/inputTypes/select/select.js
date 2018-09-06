import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import './select.html'
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass'

// Template.afSelect_materialize.onRendered(initializeSelect)
Template.afSelect_materialize.onRendered(() => {
  const instance = Template.instance()
  instance.$('select').formSelect()
})

Template.afSelect_materialize.helpers({
  atts: attsToggleInvalidClass,

  optionAtts(option) {
    const data = Template.currentData()
    console.log('select data', data)
    console.log('option', option)
    const atts = {
      value: option.value,
    }

    // if option is empty first option
    // if (option._id === 'AUTOFORM_EMPTY_FIRST_OPTION') {
    //   if (data.atts.required !== undefined) {
    //     atts.disabled = ''
    //   }
    // }

    if (option.selected) {
      atts.selected = ''
    }
    return atts
  },

  optionLabel(option) {

    // if option is first empty option
    if (option._id === 'AUTOFORM_EMPTY_FIRST_OPTION') {

      // change label to placeholder if it exists
      if (option.atts.placeholder) {
        return option.atts.placeholder
      }
    }
    return option.label
  },

  // firstValueSelected: function () {
  //   const data = Template.currentData()
  //   if (isEmptySelect(data.value) &&
  //       (data.atts.firstOption || data.atts.placeholder)) {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // }
})
