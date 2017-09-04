Package.describe({
  name: 'mozfet:autoform-materialize',
  summary: 'Materialize theme for Autoform',
  version: '3.0.0',
  git: 'https://github.com/mozfet/meteor-autoform-materialize.git'
});

Npm.depends({
  'moment': '2.18.0'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.4');
  api.use(['templating', 'underscore'], 'client');
  api.use('ecmascript@0.7.2');
  api.use('aldeed:autoform@6.0.0');
  api.use('mozfet:materialize-icons@0.0.3');
  api.addFiles([
    'index.js'
  ], 'client');
});
