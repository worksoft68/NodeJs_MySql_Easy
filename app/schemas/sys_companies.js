//**************************************************************************************************************************
//     Creation time: Friday, 02 June 2023 9:32 AM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'sys_companies',
	primaryKeyColumn: 'id',
	id: 'int',
	name: 'string',
	address: 'string',
	provincial: 'Int64',
	district: 'Int64',
	email1: 'string',
	email2: 'string',
	phone_number1: 'string',
	phone_number2: 'string',
	number_worker: 'int',
	note: 'string',
	renewal_date: 'DateTime',
	expiration_date: 'DateTime',
	representative_name: 'string',
	link_facebook: 'string',
	registration_amount: 'int',
	registered_storage: 'int',
	registered_sms: 'int',
	registration_amount_sms: 'int',
	bank_account_number1: 'string',
	bank_name1: 'string',
	bank_account_number2: 'string',
	bank_name2: 'string',
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
