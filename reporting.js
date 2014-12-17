/*if (Meteor.isClient) {
>>>>>>> 71a51bd8306b02248c79a6fbb87486b29ea39803
    Meteor.subscribe('audits');
    Template.reporting.helpers({
        audits: function () {
            return Audits.find();
        }
    });
    //
}*/
var fields = ['event', 'user', 'page', 'time'];
var Pages = new Meteor.Pagination(Audits,{
    table: {
        class: "table",
        fields: fields,
        header: fields,
        wrapper: 'table-wrapper'
    }
});





