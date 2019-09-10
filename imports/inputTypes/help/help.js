/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './help.html';

Template.afHelp_materialize.helpers({
  ifError: function() {
    return this.error ? `data-error="${error}"` : ''
  },
  ifSuccess: function() {
    return this.success ? `data-success="${success}"` : ''
  }
});