Package.describe({
  name: 'mozfet:autoform-materialize',
  summary: 'Materialize theme for Autoform',
  version: '5.0.6',
  git: 'https://github.com/mozfet/meteor-autoform-materialize.git'
});

Npm.depends({
  'moment': '2.22.2',
  '@shopify/draggable': '1.0.0-beta.8'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.6');
  api.use(['templating@1.3.0', 'blaze@2.3.0'], 'client');
  api.use([
    'aldeed:autoform@6.3.0',
    'mozfet:materialize-icons@1.1.7'
  ], 'client');
  api.use(['ecmascript', 'underscore'], 'client');
  api.use('fourseven:scss@4.12.0');
  api.addFiles(['index.js', 'style.scss'], 'client');
});
