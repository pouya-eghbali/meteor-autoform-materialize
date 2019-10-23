# Meteor Autoform Materialize templates

This is a fork of Meteor Autoform Materialize templates. The original readme can be found [here](README.original.md).

# What has been changed?

Here's a list of what's been changed:

## Features

* **Performance**:
  * **Throttle select item rendering**:
      When there are many select options and the `options` method is reactive,
      this function gets recalled a lot as the data gets loaded. I throttled this
      function to improve performance.

* **Collapsible arrays**:
      Arrays are collapsible now. The following options are available for array now:

  * `arrayHeaderDefault`: Default text to show in array headers (in case other methods fail to return a header)
  * `arrayHeaderField`:
      Use value of an inner field as array header (applies to arrays of objects).
      Use `$` as this option's value to get the array item instead (applies to arrays of any type).
      This value can be later processed with `arrayHeaderFieldCallback` option.
  * `arrayHeaderFieldCallback`: Process the value of the array item and return appropriate header.
  * `arrayHeaderTemplate`: Use a template to render the array header.
  * `allOpen`: Initialize the collapsible with all items open.
  * `collapsible`: Set to `false` to disable collapsible

* **Arrays**
  * `noTitle`: If set to `true`, title will not be rendered
  * `addTooltip`: Add button tooltip text, defaults to "Add"
  * `moveTooltip`: Move handle tooltip for array items
  * `editTooltop`: Edit icon tooltip for array items
  * `removeTooltip`: Remove button tooltip text, defaults to "Remove"
  * `removeModalHeader`: Header for array item removal modal
  * `removeModalBody`: Body for array item removal modal
  * `removeModalNo`: No button text for item removal modal
  * `removeModalYes`: Yes button text for item removal modal

* **Objects**
  * `noTitle`: If set to `true`, title will not be rendered
  * `noCard`: If set to `true`, object won't be rendered in a card

* **Column size control**:
      Instead of applying `s12` to all fields, you can now control the size class by providing a `size`
      in your AutoForm options.

* **Field grouping**:
      Added ability to group fields together. Following options are available:

  * `group`: Name or Id of the group. Will be created if it doesn't exist.
  * `groupTitle`:
        Sets the title of `group` to this value. Should be defined once, if it's declared in one than one
        field the value will be overwritten by the last definition.
  * `groupHelp`:
        Help text for the `group`. Should be defined once, if it's declared in one than one
        field the value will be overwritten by the last definition.
  * `help`:
        Help text|html for the field. Example usage:

        name: {
          type: String,
          autoform: {
            data: {
              help: {
                text: "Help text",
                html: "Help html"
              }
            }
          }
        }

  * `groupOrder`:
        Order of the `group`. A number. The bigger the number the lower the `group` will be rendered in the form.
        Should be defined once, if it's declared in one than one
        field the value will be overwritten by the last definition.
  * `order`:
        Order of the field. A number. The bigger the number the lower the field will be rendered in the `group`.
  * `groupClass`:
        Adds classes to the `group` container.
  * `collapsibleGroups`:
        Add this to an `Object` field to make the groups in that field collapsible.

* **Save and Cancell buttons**:
      You can render your quickForm with following options now:

  * `cancelButton`: A text value to be displayed on cancel button.
  * `saveButton`: A text value to be displayed on save button. Sets `afUsedFormButton` session variable to `"save"`

* **FontAwesome Icons**:
      You need to include fontawesome icons yourself.
      Following options are available:

  * `icon`: Name of the Materialize or FontAwesome icon (for fontawesome it's what comes after fa[bdlrs]?-)
  * `iconType`:
      If not defined, Materialize icon will be assumed.
      It can be one of `['fa', 'fab', 'fad', 'fal', 'far', 'fas']`

* **Select element enhancements**:
  * `enableSearch`:
      Set `enableSearch` to `true` to render a search bar inside select elements.
  * `searchPlaceholder`:
      Placeholder for search. Defaults to `Search...`
  * `enableSelectAll`:
      Adds a select all option inside select-multiple elements.
  * `selectAllText`:
      Text to be displayed as the select all option.
  * `selectNoneText`:
      Text to be displayed as the select none option.
