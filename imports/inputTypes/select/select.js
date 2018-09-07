import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import './select.html'
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass'
import '../../utilities/jqueryAttributeChangePlugin'
import { _ } from 'meteor/underscore'

Template.afSelect_materialize.onCreated(() => {
  const instance = Template.instance()
  instance.selectedItem = new ReactiveVar()
  instance.firstItemWasUnSelected = new ReactiveVar(false)
})

// Template.afSelect_materialize.onRendered(initializeSelect)
Template.afSelect_materialize.onRendered(() => {
  let instance = Template.instance()

  // init materialize select
  // const parent = instance.$('*').parent()
  instance.$('select').formSelect()
  // const initialText = parent.find('li.selected span').text()
  // const initialItem = _.find(instance.data.items, item => {
  //   return item.label === initialText
  // })
  // instance.selectedItem.set(initialItem)

  // on attribute change
  // parent.find('li').attrchange((attrName, target) => {
  //
  //   if (attrName == 'class') {
  //     const li = $(target)
  //     if (li.hasClass('selected')) {
  //       const text = li.find('span').text()
  //
  //       console.log('selected option text:', text)
  //       console.log('all items:', instance.data.items)
  //       const item = _.find(instance.data.items, item => {
  //         return item.label === text
  //       })
  //       console.log('selected item:', item)
  //       instance.selectedItem.set(item)
  //     }
  //   }
  // })

  instance.autorun(() => {
    const item = instance.selectedItem.get()
    if (item._id !== "AUTOFORM_EMPTY_FIRST_OPTION") {
      console.log('selected item is not the empty first option')
      instance.firstItemWasUnSelected.set(true)
    }
    else {
      console.log('selected item is the empty first option')
    }
  })
})

Template.afSelect_materialize.helpers({
  atts: attsToggleInvalidClass,

  optionAtts(option) {
    const instance = Template.instance()
    instance.firstItemWasUnSelected.get()

    const data = Template.currentData()
    console.log('select data', data)
    console.log('option', option)
    const atts = {
      value: option.value,
    }

    // if option is empty first option
    // if (option._id === 'AUTOFORM_EMPTY_FIRST_OPTION') {
    //   console.log('optionAtts: is empty first option:', data.atts)
    //   // if option is required
    //   if (data.atts.required !== undefined) {
    //     console.log('optionAtts: select is required')
    //     if first item was unselected
    //     if (!instance.firstItemWasUnSelected.get()) {
    //       console.log('optionAtts: first item was unselected')
    //       atts.disabled = ''
    //     }
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
