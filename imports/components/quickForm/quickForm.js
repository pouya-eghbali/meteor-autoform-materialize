/*jshint esversion: 6 */

import { Template } from "meteor/templating";
import "./quickForm.html";

Template.quickForm_materialize.events({
  "click .afCancelButton"(event) {
    event.preventDefault();
    window.history.go(-1);
  },
  "click .afSaveButton"(event) {
    Session.set("afUsedFormButton", "save");
  },
  "click .afSubmitButton"(event) {
    Session.set("afUsedFormButton", "submit");
  },
});

Template.quickForm_materialize.helpers({
  submitButtonAtts: function () {
    var atts, qfAtts;
    qfAtts = this.atts;
    atts = {};
    if (typeof qfAtts.buttonClasses === "string") {
      atts["class"] = qfAtts.buttonClasses;
    } else {
      atts["class"] = "btn waves-effect waves-light afSubmitButton";
    }
    return atts;
  },
  groupped: function (fields, options) {
    let schema = AutoForm.getFormSchema()._schema;
    let groups = {};
    fields.forEach(function (field) {
      let autoform = schema[field.name.replace(/\.\d+/g, ".$")].autoform || {};
      const group = autoform.group || "default";
      const gclass = autoform.groupClass || "";
      const title = autoform.groupTitle || "";
      const icon = autoform.groupIcon || "";
      const iconType = autoform.groupIconType || "";
      const help = autoform.groupHelp || "";
      const helpIsHTML = autoform.groupHelpIsHTML || false;
      const gorder =
        autoform.groupOrder != undefined ? autoform.groupOrder : 999;
      const order = autoform.order != undefined ? autoform.order : 999;
      groups[group] = groups[group] || { name: group, fields: [] };
      groups[group].fields.push(field);
      groups[group].order = groups[group].order || gorder;
      groups[group].help = groups[group].help || help;
      groups[group].helpIsHTML = groups[group].helpIsHTML || helpIsHTML;
      groups[group].title = groups[group].title || title;
      groups[group].icon = groups[group].icon || icon;
      groups[group].iconType = groups[group].iconType || iconType;
      groups[group].gclass = groups[group].gclass || gclass;
      field.order = order;
    });
    Object.values(groups).forEach(function (group) {
      group.fields = group.fields.sort((a, b) => {
        return a.order - b.order;
      });
    });
    return Object.values(groups).sort((a, b) => {
      return a.order - b.order;
    });
  },
  tabbed: function (fields, options) {
    let schema = AutoForm.getFormSchema()._schema;
    let groups = {};
    let tabs = {};
    fields.forEach(function (field) {
      let autoform = schema[field.name.replace(/\.\d+/g, ".$")].autoform || {};
      const group = autoform.group || "default";
      const groupTab = autoform.groupTab || "main";
      const groupTabOrder = autoform.groupTabOrder || 0;
      const groupTabTitle =
        autoform.groupTabTitle ||
        groupTab.slice(0, 1).toUpperCase() + groupTab.slice(1);
      const gclass = autoform.groupClass || "";
      const title = autoform.groupTitle || "";
      const icon = autoform.groupIcon || "";
      const iconType = autoform.groupIcon || "";
      const help = autoform.groupHelp || "";
      const helpIsHTML = autoform.helpIsHTML || false;
      const gorder =
        autoform.groupOrder != undefined ? autoform.groupOrder : 999;
      const order = autoform.order != undefined ? autoform.order : 999;
      groups[group] = groups[group] || { name: group, fields: [] };
      groups[group].fields.push(field);
      groups[group].order = groups[group].order || gorder;
      groups[group].help = groups[group].help || help;
      groups[group].helpIsHTML = groups[group].helpIsHTML || helpIsHTML;
      groups[group].title = groups[group].title || title;
      groups[group].icon = groups[group].icon || icon;
      groups[group].iconType = groups[group].iconType || iconType;
      groups[group].gclass = groups[group].gclass || gclass;
      groups[group].groupTab = groups[group].groupTab || groupTab;
      groups[group].groupTabOrder =
        groups[group].groupTabOrder || groupTabOrder;
      groups[group].groupTabTitle =
        groups[group].groupTabTitle || groupTabTitle;
      field.order = order;
    });
    for (const group in groups) {
      const { groupTab, groupTabOrder, groupTabTitle } = groups[group];
      tabs[groupTab] = tabs[groupTab] || { groups: [] };
      tabs[groupTab].order = tabs[groupTab].order || groupTabOrder;
      tabs[groupTab].title = tabs[groupTab].title || groupTabTitle;
      tabs[groupTab].name = tabs[groupTab].name || groupTab;
      if (!tabs[groupTab].groups.includes(group))
        tabs[groupTab].groups.push(group);
    }
    if (Object.keys(tabs).length == 1 && Object.keys(tabs)[0] == "main")
      return false;
    Object.values(groups).forEach(function (group) {
      group.fields = group.fields.sort((a, b) => {
        return a.order - b.order;
      });
    });
    Object.values(tabs).forEach(function (tab) {
      tab.groups = tab.groups.sort((a, b) => {
        return groups[a].order - groups[b].order;
      });
    });
    return Object.values(tabs)
      .sort((a, b) => {
        return a.order - b.order;
      })
      .map((tab) => {
        return {
          ...tab,
          groups: tab.groups.map((group) => groups[group]),
        };
      });
  },
});

Template.quickForm_materialize.onRendered(function () {
  this.$(".tabs").tabs();
});
