/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import './icon.css';
import './icon.html';

Template.afIcon_materialize.helpers({
  getIcon() {
    return ['fa', 'fab', 'fad', 'fal', 'far', 'fas'].includes(this.iconType) ?
      `<i class="${this.iconType} fa-${this.icon} prefix"></i>` :
      `<i class="material-icons prefix">${this.icon}</i>`;
  }
})