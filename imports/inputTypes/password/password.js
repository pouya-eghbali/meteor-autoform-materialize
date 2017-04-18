/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './password.html';
import { attsToggleInvalidClass } from '../../utilities/attsToggleInvalidClass';

Template.afInputPassword_materialize.helpers({
  atts: attsToggleInvalidClass
});

Template.afInputPassword_materialize.rendered = function() {
    this.$('textarea').characterCounter();
};
