//**************************************************************************************************************************
//     Creation time: Saturday, 04 November 2023 4:24 PM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'contact',
	primaryKeyColumn: 'id',
	id: 'int',
	fullname: 'string',
	email: 'string',
	phone: 'string',
	content_message: 'string',
	done_processing: 'int',
};
module.exports = {
	schemas
};
