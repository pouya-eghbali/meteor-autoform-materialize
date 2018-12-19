import { Template } from 'meteor/templating'
import './select-radio.html'

Template.afRadioGroup_materialize.onCreated(() => {
  const instance = Template.instance()
})

Template.afRadioGroup_materialize.helpers({
  dsk() {
    const instance = Template.instance()
    return {
      'data-schema-key': instance.data.atts['data-schema-key']
    }
  },
  itemAtts(item) {
    const instance = Template.instance()
    return {
      type: 'radio',
      value: item.value,
      checked: item.selected?item.selected:
          item.value === instance.data.atts.default,
      id: item.atts.id+'_'+item._id,
      name: item.name
    }
  }
})
