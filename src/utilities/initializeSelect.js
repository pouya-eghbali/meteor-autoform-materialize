/*jshint esversion: 6 */
import { Template } from 'meteor/templating';

export const initializeSelect = function () {
  const instance = Template.instance();

  const select = instance.$('select');
  select.material_select();

  const initialize = _.debounce(function () {
    select.material_select();
  }, 500);

  instance.autorun(function () {
    // reinitialize select when data changes
    Template.currentData();
    initialize();
  });
};
