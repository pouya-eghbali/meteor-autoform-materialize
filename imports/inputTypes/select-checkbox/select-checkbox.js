import { Template } from 'meteor/templating'
import './select-checkbox.html'

Template.afCheckboxGroup_materialize.onCreated(() => {
  const instance = Template.instance()  
})

Template.afCheckboxGroup_materialize.helpers({
  dsk() {
    const instance = Template.instance()
    return {
      'data-schema-key': instance.data.atts['data-schema-key']
    }
  },
  itemAtts(item) {
    const atts = {
      type: 'checkbox',
      value: item.value,
      checked: item.selected,
      id: item.atts.id+'_'+item._id,
      name: item.name
    }
    return atts
  }
})
