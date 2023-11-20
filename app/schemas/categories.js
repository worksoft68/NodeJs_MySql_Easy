let schemas = {
	table: 'categories',
	primaryKeyColumn: 'id',
	id: 'int',
	parent_id: 'int',
	companies_id: 'int',
	name: 'string',
	slug: 'string',
	thumbnail: 'string',
	viewtype: 'string',
	link: 'string',
	zone: 'string',
	is_show_homepage: 'byte',
	ordering: 'int',
	description: 'string',
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
