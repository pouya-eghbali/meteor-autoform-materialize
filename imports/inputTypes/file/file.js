/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './file.html';

Template.afInputFile_materialize.helpers({
  getButtonText() {
    console.log(this);

    return this.atts.buttonText || 'File'
  }
})