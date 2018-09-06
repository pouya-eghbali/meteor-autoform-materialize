import { Template } from 'meteor/templating'

export const initializeSelect = function () {
  const instance = Template.instance()

  const select = instance.$('select')
  select.formSelect()

  const initialize = _.debounce(() => {

    // if value is defined and not empty
    if (!_.isUndefined(instance.data.value) &&
        !_.isEmpty(instance.data.value)) {

      // if value is array
      if (_.isArray(instance.data.value)) {

        // for each value
        for (let value of instance.data.value) {
          // console.log(`init select option ${value}`);

          // select option
          $(`#${instance.data.atts.id} option[value="${value}"]`)
              .attr('selected', true)
        }
      }

      // else - value is not array
      else {
        // console.log(`init select option ${instance.data.value}`);

          // select option
          $(`#${instance.data.atts.id} option[value="${instance.data.value}"]`)
              .attr('selected', true)
      }
    }

    // init materialize form component
    select.formSelect()
  }, 500)

  // autorun
  instance.autorun(function () {

    // reinitialize select when data changes
    const currentData = Template.currentData()
    initialize()
  })
}
