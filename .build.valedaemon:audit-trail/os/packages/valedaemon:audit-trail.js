(function () {

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/valedaemon:audit-trail/valedaemon:audit-trail.js                        //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
Audits = new Mongo.Collection('audits');                                            // 1
                                                                                    // 2
function getUser() {                                                                // 3
	var user;                                                                          // 4
	if (!Meteor.user()) {                                                              // 5
		user = "guest";                                                                   // 6
	} else {                                                                           // 7
		user = Meteor.userId();                                                           // 8
	}                                                                                  // 9
}                                                                                   // 10
                                                                                    // 11
at = {                                                                              // 12
	createLog: function(msg) {                                                         // 13
		var tmpl = UI._templateInstance();                                                // 14
		var uri = tmpl.firstNode.baseURI;                                                 // 15
		var tmplName = tmpl.view.name;                                                    // 16
		console.log(tmpl);                                                                // 17
		console.log(tmplName);                                                            // 18
		auditTrail({"event": msg, "user": getUser(), "page": uri, "template": tmplName}); // 19
	}                                                                                  // 20
}                                                                                   // 21
                                                                                    // 22
Router.onAfterAction(function auditRequests() {                                     // 23
	var method = this.method;                                                          // 24
	var url = this.url;                                                                // 25
	var user = getUser();                                                              // 26
	console.log(method);                                                               // 27
	auditTrail({"event": method, "user": getUser(), "page": url});                     // 28
});                                                                                 // 29
                                                                                    // 30
auditTrail = function(obj) {                                                        // 31
	Audits.insert(obj);                                                                // 32
}                                                                                   // 33
//////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/valedaemon:audit-trail/reporting.js                                     //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
if (Meteor.isClient) {                                                              // 1
    Template.reporting.helpers({                                                    // 2
        audits: function () {                                                       // 3
            return Audits.find();                                                   // 4
        }                                                                           // 5
    });                                                                             // 6
}                                                                                   // 7
                                                                                    // 8
                                                                                    // 9
                                                                                    // 10
                                                                                    // 11
//////////////////////////////////////////////////////////////////////////////////////

}).call(this);
