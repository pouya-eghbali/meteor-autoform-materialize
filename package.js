Package.describe({
  name: "mozfet:autoform-materialize",
  summary: "Materialize theme for Autoform",
  version: "2.0.2",
  git: "https://github.com/mozfet/meteor-autoform-materialize.git"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.4");
  api.use(["templating", "underscore"], "client");
  api.use("ecmascript@0.7.2");
  api.use('momentjs:moment@2.10.6');
  api.use("aldeed:autoform@6.0.0");
  api.addFiles([
    'src/index.js'
  ], "client");
});
