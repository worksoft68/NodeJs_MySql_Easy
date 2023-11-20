//**************************************************************************************************************************
//     Creation time: Saturday, 04 November 2023 4:32 PM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'sys_function_for_permissions',
	primaryKeyColumn: 'function_name',
	function_name: 'string',
	description: 'string',
	note: 'string',
	modulesystem: 'string',
	status: 'byte',
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
