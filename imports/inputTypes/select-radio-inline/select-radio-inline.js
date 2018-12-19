import { Template } from 'meteor/templating'
import './select-radio-inline.html'

Template.afRadioGroupInline_materialize.onCreated(() => {
  const instance = Template.instance()
})

Template.afRadioGroupInline_materialize.helpers({
  dsk() {
    const instance = Template.instance()
    return {
      'data-schema-key': instance.data.atts['data-schema-key']
    }
  },
  itemAtts(item) {
    return {
      type: 'radio',
      value: item.value,
      checked: item.selected,
      id: item.atts.id+'_'+item._id,
      name: item.name
    }
  }
})
