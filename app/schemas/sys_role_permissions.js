let schemas = {
	table: 'sys_role_permissions',
	primaryKeyColumn: 'id',
	id: 'int',
	role_id: 'int',
	functions: 'string',
	fullauthority: 'byte',
	addnew: 'byte',
	updates: 'byte',
	readonly: 'byte',
	full_of_yourself: 'byte',
	permission1: 'byte',
	permission2: 'byte',
	permission3: 'byte',
	permission4: 'byte',
	permission5: 'byte',
	permission6: 'byte',
	permission7: 'byte',
	permission8: 'byte',
	permission9: 'byte',
	permission10: 'byte',
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
