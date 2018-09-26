Package.describe({
  name: 'mozfet:autoform-materialize',
  summary: 'Materialize theme for Autoform',
  version: '4.0.7',
  git: 'https://github.com/mozfet/meteor-autoform-materialize.git'
});

Npm.depends({
  'moment': '2.18.0',
  '@shopify/draggable': '1.0.0-beta.4'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.6');
  api.use('ecmascript@0.7.2');
  api.use([
    'underscore',
    'templating@1.2.13',
    'aldeed:autoform@6.2.0',
    'mozfet:materialize-icons@1.0.2'
  ], 'client');
  api.use('fourseven:scss@4.9.0');
  api.addFiles(['index.js', 'style.scss'], 'client');
});
