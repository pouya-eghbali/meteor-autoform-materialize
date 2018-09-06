Package.describe({
  name: 'mozfet:autoform-materialize',
  summary: 'Materialize theme for Autoform',
  version: '4.0.0',
  git: 'https://github.com/mozfet/meteor-autoform-materialize.git'
});

Npm.depends({
  'moment': '2.18.0',
  'underscore': '1.8.3',
  '@shopify/draggable': '1.0.0-beta.4'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.4');
  api.use(['templating', 'underscore'], 'client');
  api.use('ecmascript@0.7.2');
  api.use('aldeed:autoform@6.2.0');
  api.use('mozfet:materialize-icons@0.0.3');
  api.use('fourseven:scss@4.5.4');
  api.use('manuel:reactivearray@1.0.6');
  api.addFiles(['index.js', 'style.scss'], 'client');
});
