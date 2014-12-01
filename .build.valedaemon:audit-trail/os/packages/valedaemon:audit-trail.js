(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/valedaemon:audit-trail/valedaemon:audit-trail.js                                                  //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Audits = new Mongo.Collection('audits');                                                                      // 1
                                                                                                              // 2
function getUser() {                                                                                          // 3
	var user;                                                                                                    // 4
	if (!Meteor.user()) {                                                                                        // 5
		user = "guest";                                                                                             // 6
	} else {                                                                                                     // 7
		user = Meteor.userId();                                                                                     // 8
	}                                                                                                            // 9
	return user;                                                                                                 // 10
}                                                                                                             // 11
                                                                                                              // 12
function getTime() {                                                                                          // 13
        var now = new Date();                                                                                 // 14
        return now;                                                                                           // 15
}                                                                                                             // 16
                                                                                                              // 17
at = {                                                                                                        // 18
	createLog: function(msg) {                                                                                   // 19
		var tmpl = UI._templateInstance();                                                                          // 20
		var uri = tmpl.firstNode.baseURI;                                                                           // 21
		var tmplName = tmpl.view.name;                                                                              // 22
		console.log(tmpl);                                                                                          // 23
		console.log(tmplName);                                                                                      // 24
		auditTrail({"event": msg, "user": getUser(), "page": uri, "template": tmplName, "time": getTime()});        // 25
	}                                                                                                            // 26
}                                                                                                             // 27
                                                                                                              // 28
Router.onAfterAction(function auditRequests() {                                                               // 29
	console.log(this);                                                                                           // 30
	var method = this.method;                                                                                    // 31
	var url = this.request.url;                                                                                  // 32
	var path = this.route._path;                                                                                 // 33
	var template = this.router._layout.name;                                                                     // 34
	var user = getUser();                                                                                        // 35
	console.log(method);                                                                                         // 36
	auditTrail({"event": "GET "+path, "user": getUser(), "page": url, "template": template, "time": getTime()}); // 37
}, {where: 'server'});                                                                                        // 38
                                                                                                              // 39
auditTrail = function(obj) {                                                                                  // 40
	Audits.insert(obj);                                                                                          // 41
}                                                                                                             // 42
                                                                                                              // 43
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/valedaemon:audit-trail/reporting.js                                                               //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
if (Meteor.isClient) {                                                                                        // 1
    Template.reporting.helpers({                                                                              // 2
        audits: function () {                                                                                 // 3
            return Audits.find();                                                                             // 4
        }                                                                                                     // 5
    });                                                                                                       // 6
}                                                                                                             // 7
                                                                                                              // 8
                                                                                                              // 9
                                                                                                              // 10
                                                                                                              // 11
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
