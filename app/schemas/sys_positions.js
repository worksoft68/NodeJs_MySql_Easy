//**************************************************************************************************************************
//     Creation time: Thursday, 01 June 2023 4:36 PM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'sys_positions',
	primaryKeyColumn: 'id',
	id: 'int',
	name: 'string',
	ordering: 'int',
	is_manager: 'byte',
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
