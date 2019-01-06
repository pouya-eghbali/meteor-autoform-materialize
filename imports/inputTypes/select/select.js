import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { _ } from 'meteor/underscore'
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass'
import '../../utilities/jqueryAttributeChangePlugin'
import './select.html'

// on template rendered
Template.afSelect_materialize.onRendered(() => {
  const instance = Template.instance()

  // get select element, query
  const selectQuery = instance.$('select')
  const selectElement = selectQuery.get(0)

  // react when template data changes
  let oldItems
  instance.autorun(() => {
    const data = Template.currentData()
    console.log('select template data', data)

    // if items changed
    if (!_.isEqual(oldItems, data.items)) {
      console.log('items changed', oldItems, data.items)

      // assign new items to old items
      oldItems = _.clone(data.items)

      // if select instance exists
      let selectedValues
      if (instance.selectInstance) {

        // get selected values
        selectedValues = AutoForm.getFieldValue(data.atts.name)

        // normalise selected values (for multiple select)
        if (!_.isArray(selectedValues)) {
          selectedValues = [selectedValues]
        }
        console.log('old selectedValues', selectedValues)

        // select previous selected values in new items
        data.items = _.map(data.items, item => {
          return _.contains(selectedValues, item.value)?
              _.extend(item, {selected: true}):item
        })
        console.log('data.items', data.items)

        // destory previous instance of materialize select
        instance.selectInstance.destroy()
      }

      // remove all children of the select element
      selectQuery.empty()

      // render items template inside select element
      Blaze.renderWithData(Template.afSelect_materialize_items, data, selectElement)

      // init materialize select
      instance.selectInstance = M.FormSelect.init(selectElement)
    }
  })
})

// helpers
Template.afSelect_materialize.helpers({
  atts: attsToggleInvalidClass
})

// on destroyed
Template.afSelect_materialize.onDestroyed(() => {
  const instance = Template.instance()

  // destory instance of materialize select
  if (instance.selectInstance) {
    instance.selectInstance.destroy()
  }
})

// helpers
Template.afSelect_materialize_items.helpers({
  atts: attsToggleInvalidClass,

  // get DOM attributes for an option
  optionAtts(option) {
    const instance = Template.instance()

    // init atts with option value
    const atts = {
      value: option.value,
    }
    // if selected
    if (option.selected) {

      // select option on DOM
      atts.selected = ''
    }

    // // if option is empty first option
    // if (option._id === 'AUTOFORM_EMPTY_FIRST_OPTION') {
    //   console.log('optionAtts: is empty first option:')
    //
    //   // if option is required
    //   if (instance.data.atts.required !== undefined) {
    //     console.log('optionAtts: select is required')
    //     //if first item was unselected
    //     if (!instance.firstItemWasUnSelected.get()) {
    //       console.log('optionAtts: first item was unselected')
    //       atts.disabled = ''
    //     }
    //   }
    // }

    // return atts
    return atts
  },

  // get label for an option
  optionLabel(option) {
    if (option._id === 'AUTOFORM_EMPTY_FIRST_OPTION') {
      if (option.atts.placeholder) {
        return option.atts.placeholder
      }
    }
    return option.label
  }
})
