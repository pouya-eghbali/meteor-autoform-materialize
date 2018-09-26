// imports
import { Template } from 'meteor/templating'
import './boolean-select.html'
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass.js'
import { optionAtts } from '../../utilities/optionAtts.js'
import { initializeSelect } from '../../utilities/initializeSelect.js'

// helpers
Template.afBooleanSelect_materialize.helpers({
  atts: attsToggleInvalidClass,
  optionAtts: optionAtts
})

// on rendered
Template.afBooleanSelect_materialize.onRendered(initializeSelect);
