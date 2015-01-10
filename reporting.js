
    var fields = ['event', 'user', 'time'];

    var Pages = new Meteor.Pagination(Audits, {
	sort: {
	    time: -1
	},
        table: {
            class: "table",
            fields: fields,
            header: fields,
            wrapper: 'table-wrapper'
        },
        filters: {'type': 'action'}
    });



