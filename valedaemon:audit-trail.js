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

function getTime() {
        var now = new Date();
        return now;
}

at = {
	createLog: function(msg) {
		var tmpl, uri, tmplName;

        if (UI._templateInstance() !== null && UI._templateInstance() !== "undefined"){
            tmpl = UI._templateInstance();
            uri = tmpl.firstNode.baseURI;
            tmplName = tmpl.view.name;
        } else {
            tmpl = 'N/A';
            uri = templName = 'Custom server action'
        }

		console.log(tmpl);
		console.log(tmplName);
		auditTrail({"event": msg, "user": getUser(), "page": uri, "template": tmplName, "time": getTime()});
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
	auditTrail({"event": "GET "+path, "user": getUser(), "page": url, "template": template, "time": getTime()});
}, {where: 'server'});

auditTrail = function(obj) {
	Audits.insert(obj);
}
