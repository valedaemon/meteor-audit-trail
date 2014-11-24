if (Meteor.isClient) {
    Template.reporting.helpers({
        audits: function () {
            return Audits.find();
        }
    });
}



