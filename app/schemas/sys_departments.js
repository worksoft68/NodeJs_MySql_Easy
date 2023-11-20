//**************************************************************************************************************************
//     Creation time: Friday, 02 June 2023 9:36 AM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'sys_departments',
	primaryKeyColumn: 'id',
	id: 'int',
	company_id: 'int',
	name: 'string',
	abbreviation: 'string',
	ordering: 'int',
	status: 'string',
	user_id_created: 'int',
	user_name_created: 'string',
	datetime_created: 'DateTime',
	user_id_modified: 'int',
	user_name_modified: 'string',
	datetime_modified: 'DateTime',
};
module.exports = {
	schemas
};
