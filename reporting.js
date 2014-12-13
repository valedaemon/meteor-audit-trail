/*if (Meteor.isClient) {
    Meteor.subscribe('audits');
    Template.reporting.helpers({
        audits: function () {
            return Audits.find();
        }
    });
    //
}*/
var fields = ['event', 'user', 'page'];
var Pages = new Meteor.Pagination(Audits,{
    table: {
        class: "table",
        fields: fields,
        header: fields,
        wrapper: 'table-wrapper'
    }
});





