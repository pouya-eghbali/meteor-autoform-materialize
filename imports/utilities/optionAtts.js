export const optionAtts = function () {
  const option = this;
  const atts = {
    value: option.value,
  }

  // if option is first empty option
  if (option._id === 'AUTOFORM_EMPTY_FIRST_OPTION') {

    // change label to placeholder if it exists
    option.label = option.atts.placeholder?option.atts.placeholder:option.label

    atts.disabled = ''
  }

  if (option.selected) {
    atts.selected = ''
  }
  return atts;
}
