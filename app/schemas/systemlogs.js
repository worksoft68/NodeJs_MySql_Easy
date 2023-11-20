//**************************************************************************************************************************
//     Creation time: Wednesday, 25 October 2023 11:14 AM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'systemlogs',
	primaryKeyColumn: 'id',
	id: 'Int64',
	action_user: 'string',
	impact_zone: 'string',
	id_table: 'string',
	content_log: 'string',
	contentlog_max: 'string',
	ip: 'string',
	mac_address: 'string',
	hostname: 'string',
	id_user: 'Int64',
	fullname: 'string',
	datetime_log: 'DateTime',
};
module.exports = {
	schemas
};
