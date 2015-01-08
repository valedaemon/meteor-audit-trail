



    var fields = ['event', 'user', 'page', 'time'];
    var Pages = new Meteor.Pagination(Audits, {
        table: {
            class: "table",
            fields: fields,
            header: fields,
            wrapper: 'table-wrapper'
        },
        filters: {'type': 'action'}
    });



