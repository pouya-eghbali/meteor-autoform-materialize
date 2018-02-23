/*jshint esversion: 6 */
import { Template } from 'meteor/templating';

export const initializeSelect = function () {
  const instance = Template.instance();
  console.log('initialise select instance data:', instance.data);

  const select = instance.$('select');
  select.material_select();

  const initialize = _.debounce(() => {

    // init value for single select with predefined value or default
    instance.data.value = instance.data.value?instance.data.value:instance.data.atts.default;

    // if value is defined and not empty and not and array
    if (!_.isUndefined(instance.data.value) && !_.isEmpty(instance.data.value) && !_.isArray(instance.data.value)) {

        // init value for multiple select
        console.log('initialize select option jquery selector = "option[value="'+instance.data.value+'"]');
        console.log('initialize select instance options =', $('#'+instance.data.atts.id+' option'));
        console.log('initialize select option element =', $('#'+instance.data.atts.id+' option[value="'+instance.data.value+'"]'));
        // find the option for value and select it
        $('#'+instance.data.atts.id+' option[value="'+instance.data.value+'"]').attr('selected', true);
    }

    // if placeholder is defined

    // else  - no placeholder

    // init materialize form component
    select.material_select();
  }, 500);

  // autorun
  instance.autorun(function () {

    // reinitialize select when data changes
    const currentData = Template.currentData();
    initialize();
  });
};
