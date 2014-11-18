Audits = new Mongo.Collection('audits');

function getUser() {
	var user;
	if (!Meteor.user()) {
		user = "guest";
	} else {
		user = Meteor.userId();
	}
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
	var method = this.method;
	var url = this.url;
	var user = getUser();
	console.log(method);
	auditTrail({"event": method, "user": getUser(), "page": url});
});

auditTrail = function(obj) {
	Audits.insert(obj);
}