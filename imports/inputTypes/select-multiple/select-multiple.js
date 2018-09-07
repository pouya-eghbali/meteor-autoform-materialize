import { Template } from 'meteor/templating'
import './select-multiple.html'
import { optionAtts } from '../../utilities/optionAtts'
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass'
import { initializeSelect } from '../../utilities/initializeSelect'

const isEmptySelect = value => {
  // console.log(`Test for empty value:`, _.clone(value));
  const valueIsEmptyArray = _.isArray(value) &&
      (value.length === 1) && (_.isEmpty(_.first(value)));
  if (_.isEmpty(value) || valueIsEmptyArray) {
    return true
  }
  else {
    return false
  }
};

const placeholder = (data) => {
  if (data.firstOption) {
    return data.atts.firstOption
  }
  else if (data.atts.placeholder) {
    return data.atts.placeholder
  }
  else return undefined
};

const isPlaceholderValue = (data) => {
  return placeholder(data) && isEmptySelect(data.value)
};

Template.afSelectMultiple_materialize.onRendered(() => {
  const instance = Template.instance()

  const select = instance.$('select')
  select.formSelect();
});

Template.afSelectMultiple_materialize.helpers({
  atts: attsToggleInvalidClass,
  optionAtts(option) {
    const atts = {value: option.value};
    if (option.selected) {atts.selected = '';}
    return atts;
  },
  firstValueSelected() {
    const instance = Template.instance();
    return isPlaceholderValue(instance.data);
  }
});
