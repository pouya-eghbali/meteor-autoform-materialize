/*jshint esversion: 6 */

export const initializeSelect = () => {
  const instance = Template.instance();
  var select = instance.$('select');
  select.material_select();

  const initialize = _.debounce(() => {
    select.material_select();
  }, 500);

  instance.autorun(() => {
    // reinitialize select when data changes
    instance.currentData();
    initialize();
  });
};
