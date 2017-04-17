Package.describe({
  name: "mozfet:autoform-materialize",
  summary: "Materialize theme for Autoform",
  version: "2.0.0",
  git: "https://github.com/mozfet/meteor-autoform-materialize.git"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0");
  api.use(["templating", "underscore"], "client");
  api.use('momentjs:moment@2.10.6');
  api.use("aldeed:autoform@6.0.0");
  api.addFiles([
    'src/index.js'
  ], "client");
});
