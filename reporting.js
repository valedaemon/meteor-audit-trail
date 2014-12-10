if (Meteor.isClient) {
    Meteor.subscribe('audits');
    Template.reporting.helpers({
        audits: function () {
            return Audits.find();
        }
    });
}



