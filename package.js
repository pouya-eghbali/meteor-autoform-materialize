Package.describe({
  name: 'mozfet:autoform-materialize',
  summary: 'Materialize theme for Autoform',
  version: '4.0.9',
  git: 'https://github.com/mozfet/meteor-autoform-materialize.git'
});

Npm.depends({
  'moment': '2.22.2',
  '@shopify/draggable': '1.0.0-beta.8'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.6');
  api.use('ecmascript');
  api.use([
    'underscore',
    'templating',
    'aldeed:autoform@6.2.0',
    'mozfet:materialize-icons@1.1.0'
  ], 'client');
  api.use('fourseven:scss@4.10.0');
  api.addFiles(['index.js', 'style.scss'], 'client');
});
