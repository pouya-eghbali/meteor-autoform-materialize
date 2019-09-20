// impoers
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import './select-multiple.html'
import { optionAtts } from '../../utilities/optionAtts'
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass'
import { initializeSelect } from '../../utilities/initializeSelect'
import './search.css'

// worker functions
function isEmptySelect(value) {
  const valueIsEmptyArray = _.isArray(value) &&
      (value.length === 1) && (_.isEmpty(_.first(value)))
  if (_.isEmpty(value) || valueIsEmptyArray) {
    return true
  }
  else {
    return false
  }
}

function placeholder(data) {
  if (data.atts.firstOption) {
    return data.atts.firstOption
  }
  else if (data.atts.placeholder) {
    return data.atts.placeholder
  }
  else return undefined
}

function hasPlaceholder(data) {
  return data.atts.firstOption || data.atts.placeholder?true:false
}

function createItems(data) {
  const items = []

  // get selected values
  let selectedValues = AutoForm.getFieldValue(data.atts.name)

  // normalise selected values (for multiple select)
  if (!_.isArray(selectedValues)) {
    selectedValues = [selectedValues]
  }
  // console.log('selectedValues', selectedValues)

  // if there is a placeholder (or first option)
  if (hasPlaceholder(data)) {

    // define first option
    const firstOption = {
      atts: {
        htmlAttributes: {}
      },
      label: placeholder(data),
      value: '',
      disabled: true,
      selected: false,
      _id: 'AUTOFORM_EMPTY_FIRST_OPTION'
    }

    // add first item
    items.push(firstOption)
  }

  // for each item
  for (let item of data.items) {

    // if item is selected in old values
    if (_.contains(selectedValues, item.value)) {

      // push selected item
      items.push(_.extend(item, {selected: true}))
    }

    // else
    else {

      // push item
      items.push(item)
    }
  }

  // return items
  // console.log('created items', items)
  return items
}

// on created
Template.afSelectMultiple_materialize.onCreated(() => {
  const instance = Template.instance()
  // init items
  instance.items = new ReactiveVar(createItems(instance.data))
})

function throttle(fn, limit) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      fn(...args)
    }, limit)
  }
}

// on rendered
Template.afSelectMultiple_materialize.onRendered(() => {
  const instance = Template.instance()

  // get select element, query
  const selectQuery = instance.$('select')
  const selectElement = selectQuery.get(0)

  // react when template data changes
  let oldItems

  const onItemsChanged = data => {
    // if items changed
    if (!_.isEqual(oldItems, data.items)) {
      // console.log('items changed', oldItems, data.items)

      // assign new items to old items
      oldItems = _.clone(data.items)

      // if select instance exists
      if (instance.selectInstance) {

        // destory previous instance
        instance.selectInstance.destroy()
      }

      // create items
      const itemData = { items: createItems(data) }

      // remove all children of the select element
      // console.log(selectQuery.get(0))
      selectQuery.empty()

      // render items template inside select element
      Blaze.renderWithData(Template.afSelect_materialize_items, itemData, selectElement)

      // init materialize select
      instance.selectInstance = M.FormSelect.init(selectElement)

      // select all options

      if (data.atts.enableSelectAll) {
        const selectAllText = data.atts.selectAllText || "Select all";
        const selectNoneText = data.atts.selectNoneText || "Select none";
        const ul = $(instance.selectInstance.dropdownOptions)
        const selectAllEl = $(
          `<li class="afSelectAllOption afNotAnActualSelectItem">
            <span><label>${selectAllText}</label></span></li>`)
        ul.prepend(selectAllEl)
        selectAllEl.click(event => {
          const selectAll = selectAllEl.find('label').text() == selectAllText
          selectAllEl.find('label').text(selectAll ? selectNoneText : selectAllText)
          ul.children('li').not('.afNotAnActualSelectItem').filter(function () {
            return $(this).find('input').prop('checked') != selectAll;
          }).click();
        })
      }

      // search bar

      if (data.atts.enableSearch) {
        const ul = $(instance.selectInstance.dropdownOptions)
        const search = $(`<input placeholder="Search...">`)
        const searchBar = $(`<div class="afSelectSearchBar afNotAnActualSelectItem"></div>`)
        const children = ul.children().not('.afNotAnActualSelectItem').toArray().map(child => {
          return { el: child, content: child.innerText.toLowerCase() }
        })
        searchBar.append(search)
        ul.prepend(searchBar)
        search.on('keydown', event => event.stopImmediatePropagation())
        search.on('keyup', event => {
          const searchTerm = event.target.value.toLowerCase()
          children.forEach(child => {
            const { el, content } = child
            if (content.includes(searchTerm)) {
              el.style.display = 'list-item'
            } else {
              el.style.display = 'none'
            }
          })
        })
      }

    }
  }

  const onItemsChangedThrottled = throttle(onItemsChanged, 100)

  instance.autorun(() => {
    const data = Template.currentData()
    // console.log('select template data', data)
    onItemsChangedThrottled(data)
  })
})

// helpers
Template.afSelectMultiple_materialize.helpers({
  atts: attsToggleInvalidClass,
  optionAtts(option) {
    const atts = {value: option.value}
    if (option.selected) {atts.selected = true}
    if (option.disabled) {atts.disabled = true}
    // console.log(`optionAtts for option ${option.label}`, atts)
    return atts
  },

})
