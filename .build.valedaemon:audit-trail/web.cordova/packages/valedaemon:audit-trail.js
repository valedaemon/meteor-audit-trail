(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/valedaemon:audit-trail/valedaemon:audit-trail.js                                            //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
Audits = new Mongo.Collection('audits');                                                                // 1
                                                                                                        // 2
function getUser() {                                                                                    // 3
	var user;                                                                                              // 4
	if (!Meteor.user()) {                                                                                  // 5
		user = "guest";                                                                                       // 6
	} else {                                                                                               // 7
		user = Meteor.userId();                                                                               // 8
	}                                                                                                      // 9
}                                                                                                       // 10
                                                                                                        // 11
at = {                                                                                                  // 12
	createLog: function(msg) {                                                                             // 13
		var tmpl = UI._templateInstance();                                                                    // 14
		var uri = tmpl.firstNode.baseURI;                                                                     // 15
		var tmplName = tmpl.view.name;                                                                        // 16
		console.log(tmpl);                                                                                    // 17
		console.log(tmplName);                                                                                // 18
		auditTrail({"event": msg, "user": getUser(), "page": uri, "template": tmplName});                     // 19
	}                                                                                                      // 20
}                                                                                                       // 21
                                                                                                        // 22
Router.onAfterAction(function auditRequests() {                                                         // 23
	var method = this.method;                                                                              // 24
	var url = this.url;                                                                                    // 25
	var user = getUser();                                                                                  // 26
	console.log(method);                                                                                   // 27
	auditTrail({"event": method, "user": getUser(), "page": url});                                         // 28
});                                                                                                     // 29
                                                                                                        // 30
auditTrail = function(obj) {                                                                            // 31
	Audits.insert(obj);                                                                                    // 32
}                                                                                                       // 33
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/valedaemon:audit-trail/template.reporting.js                                                //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
                                                                                                        // 1
Template.__checkName("reporting");                                                                      // 2
Template["reporting"] = new Template("Template.reporting", (function() {                                // 3
  var view = this;                                                                                      // 4
  return HTML.DIV({                                                                                     // 5
    "class": "container"                                                                                // 6
  }, HTML.Raw('\n        <h2>\n            <i class="fa fa-area-chart"></i> Reporting\n        </h2>\n\n        '), HTML.TABLE({
    "class": "table"                                                                                    // 8
  }, "\n            ", HTML.THEAD("\n            ", HTML.TR("\n                ", HTML.TH("\n                    Event\n                "), "\n                ", HTML.TH("\n                    User\n                "), "\n                ", HTML.TH("\n                    Page\n                "), "\n            "), "\n            "), "\n            ", HTML.TBODY("\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("audits"));                                                       // 10
  }, function() {                                                                                       // 11
    return [ "\n                ", Spacebars.include(view.lookupTemplate("audit")), "\n            " ]; // 12
  }), "\n            "), "\n        "), "\n\n    ");                                                    // 13
}));                                                                                                    // 14
                                                                                                        // 15
Template.__checkName("audit");                                                                          // 16
Template["audit"] = new Template("Template.audit", (function() {                                        // 17
  var view = this;                                                                                      // 18
  return HTML.TR("\n        ", HTML.TD(Blaze.View(function() {                                          // 19
    return Spacebars.mustache(view.lookup("event"));                                                    // 20
  })), "\n        ", HTML.TD(Blaze.View(function() {                                                    // 21
    return Spacebars.mustache(view.lookup("user"));                                                     // 22
  })), "\n        ", HTML.TD(Blaze.View(function() {                                                    // 23
    return Spacebars.mustache(view.lookup("page"));                                                     // 24
  })), "\n    ");                                                                                       // 25
}));                                                                                                    // 26
                                                                                                        // 27
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/valedaemon:audit-trail/reporting.js                                                         //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
if (Meteor.isClient) {                                                                                  // 1
    Template.reporting.helpers({                                                                        // 2
        audits: function () {                                                                           // 3
            return Audits.find();                                                                       // 4
        }                                                                                               // 5
    });                                                                                                 // 6
}                                                                                                       // 7
                                                                                                        // 8
                                                                                                        // 9
                                                                                                        // 10
                                                                                                        // 11
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);