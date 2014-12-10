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
		var tmpl,                                                                                                   // 20
            uri,                                                                                              // 21
            tmplName;                                                                                         // 22
                                                                                                              // 23
        if(UI && UI._templateInstance){                                                                       // 24
            tmpl = UI._templateInstance();                                                                    // 25
            uri = tmpl.firstNode.baseURI;                                                                     // 26
            tmplName = tmpl.view.name;                                                                        // 27
        } else {                                                                                              // 28
            tmpl = 'n/a';                                                                                     // 29
            uri = templName = 'custom server action'                                                          // 30
        }                                                                                                     // 31
                                                                                                              // 32
		console.log(tmpl);                                                                                          // 33
		console.log(tmplName);                                                                                      // 34
		auditTrail({"event": msg, "user": getUser(), "page": uri, "template": tmplName, "time": getTime()});        // 35
	}                                                                                                            // 36
}                                                                                                             // 37
                                                                                                              // 38
Router.onAfterAction(function auditRequests() {                                                               // 39
	console.log(this);                                                                                           // 40
	var method = this.method;                                                                                    // 41
	var url = this.request.url;                                                                                  // 42
	var path = this.route._path;                                                                                 // 43
	var template = this.router._layout.name;                                                                     // 44
	var user = getUser();                                                                                        // 45
	console.log(method);                                                                                         // 46
	auditTrail({"event": "GET "+path, "user": getUser(), "page": url, "template": template, "time": getTime()}); // 47
}, {where: 'server'});                                                                                        // 48
                                                                                                              // 49
auditTrail = function(obj) {                                                                                  // 50
	Audits.insert(obj);                                                                                          // 51
}                                                                                                             // 52
                                                                                                              // 53
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






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/valedaemon:audit-trail/router.js                                                                  //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
console.log('router','route');                                                                                // 1
                                                                                                              // 2
Router.map(function() {                                                                                       // 3
    this.route('reporting', {                                                                                 // 4
        path: '/reporting'                                                                                    // 5
    });                                                                                                       // 6
});                                                                                                           // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
