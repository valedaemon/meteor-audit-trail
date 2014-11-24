Package.describe({
  name: 'valedaemon:audit-trail',
  summary: 'A package devoted to providing audit methods to Meteor',
  version: '1.0.0',
  git: 'https://github.com/valedaemon/meteor-audit-trail'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['minimongo','mongo-livedata','templating','iron:router']);
  api.addFiles(['valedaemon:audit-trail.js','reporting.html','reporting.js']);

  if (api.export) {
  	api.export(['at']);
  }
});

Package.onTest(function(api) {
  api.use(['tinytest','iron:router']);
  api.use('valedaemon:audit-trail');
  api.addFiles('valedaemon:audit-trail-tests.js');
});
