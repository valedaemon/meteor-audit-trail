Package.describe({
  name: 'valedaemon:audit-trail',
  summary: 'A package devoted to providing audit methods to Meteor',
  version: '1.1.1',
  git: 'https://github.com/valedaemon/meteor-audit-trail'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['minimongo','mongo-livedata','iron:router@1.0.3','templating','accounts-base@1.1.2','alethes:pages@1.7.2']);
  api.addFiles(['valedaemon:audit-trail.js','reporting.html','reporting.js','router.js']);

  if (api.export) {
  	api.export(['at']);
  }
});

Package.onTest(function(api) {
  api.use(['tinytest','iron:router']);
  api.use('valedaemon:audit-trail');
  api.addFiles('valedaemon:audit-trail-tests.js');
});
