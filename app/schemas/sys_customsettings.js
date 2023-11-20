let schemas = {
	table: 'sys_customsettings',
	primaryKeyColumn: 'id',
	id: 'string',
	image_setting: 'string',
	is_use_ckeditor: 'byte',
	value_setting: 'string',
	default_value: 'string',
	location: 'string',
	start_time: 'DateTime',
	end_time: 'DateTime',
	description: 'string',
	status: 'byte',
	ordering: 'int',
	is_system: 'byte',
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
