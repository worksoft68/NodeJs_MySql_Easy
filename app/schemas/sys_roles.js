let schemas = {
	table: 'sys_roles',
	primaryKeyColumn: 'id',
	id: 'int',
	name: 'string',
	ordering: 'int',
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
