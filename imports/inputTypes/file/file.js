/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './file.html';

Template.afInputFile_materialize.helpers({
  getButtonText() {
    return this.atts.buttonText || 'File'
  }
})