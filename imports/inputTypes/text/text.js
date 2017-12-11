/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './text.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afInputText_materialize.helpers({
  atts: attsToggleInvalidClass,
  value() {
    const instance = Template.instance();    
    return instance.data.value?instance.data.value:instance.data.atts.default;
  }
});
