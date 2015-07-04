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
	createLog: function(msg,userId,userProfile) {
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
		auditTrail({"event": msg, "user": userId || getUser(), "name": userProfile.firstname + ' ' +  userProfile.lastname,  "page": uri, "template": tmplName, "time": getTime(), "type":"action"});
	}
}

Router.onAfterAction(function auditRequests() {
	console.log(this);
	var method = this.method;
	var url = this.request.url;
	var path = this.route._path;
	var template = this.router._layout.name;
	var user = getUser();
	var name;
    var profile;
	if(user !== 'guest'){
        profile = Meteor.user().profile;
	}
	name = (profile && typeof profile === 'undefined') ? Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname : 'guest';
	console.log('name',name);
	auditTrail({"event": "GET "+path, "user": getUser(), "name":name, "page": url, "template": template, "time": getTime(), "type":"GET"});
}, {where: 'server'});

auditTrail = function(obj) {
	Meteor.call('insertAudit', obj);
}

if (Meteor.isServer) {
	Meteor.methods({
		'insertAudit': function(obj) {
			return Audits.insert(obj);
		}
	});	
}

