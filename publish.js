if (Meteor.isServer) {
    Meteor.publish("audits", function () {
        return Audits.find();
    });
}