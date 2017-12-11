/*jshint esversion: 6 */
import { Template } from 'meteor/templating';

export const initializeSelect = function () {
  const instance = Template.instance();

  const select = instance.$('select');
  select.material_select();

  const initialize = _.debounce(() => {

    // init value for single select
    instance.data.value = instance.data.value?instance.data.value:instance.data.atts.default;

    // console.log('initialize select value = ', value);
    if (!_.isUndefined(instance.data.value) && !_.isEmpty(instance.data.value) && !_.isArray(instance.data.value)) {

        // find the option for value and select it
        console.log('initialize select option jquery selector = "option[value="'+instance.data.value+'"]');
        console.log('initialize select instance options =', $('#'+instance.data.atts.id+' option'));
        console.log('initialize select option element =', $('#'+instance.data.atts.id+' option[value="'+instance.data.value+'"]'));
        $('#'+instance.data.atts.id+' option[value="'+instance.data.value+'"]').attr('selected', true);
    }

    select.material_select();
  }, 500);

  instance.autorun(function () {
    // reinitialize select when data changes
    const currentData = Template.currentData();
    initialize();
  });
};
