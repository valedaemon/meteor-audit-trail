Audits = new Mongo.Collection('audits');

function getUser() {
	var user;
	if (!Meteor.user()) {
		user = "guest";
	} else {
		user = Meteor.userId();
	}
	return user;
}

at = {
	createLog: function(msg) {
		var tmpl = UI._templateInstance();
		var uri = tmpl.firstNode.baseURI;
		var tmplName = tmpl.view.name;
		console.log(tmpl);
		console.log(tmplName);
		auditTrail({"event": msg, "user": getUser(), "page": uri, "template": tmplName});
	}
}

Router.onAfterAction(function auditRequests() {
	console.log(this);
	var method = this.method;
	var url = this.request.url;
	var path = this.route._path;
	var template = this.router._layout.name;
	var user = getUser();
	console.log(method);
	auditTrail({"event": "GET "+path, "user": getUser(), "page": url, "template": template });
}, {where: 'server'});

auditTrail = function(obj) {
	Audits.insert(obj);
}