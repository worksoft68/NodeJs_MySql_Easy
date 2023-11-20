let schemas = {
	table: 'Sys_Department',
	primaryKeyColumn: 'DepartmentId',
	DepartmentId: 'Int64',
	CompanyId: 'Int64',
	DepartmentName: 'string',
	Abbreviation: 'string',
	NumericalOrder: 'int',
	Status: 'string',
	User_Id_Created: 'int',
	User_Name_Created: 'string',
	DateTime_Created: 'DateTime',
	User_Id_Modified: 'int',
	User_Name_Modified: 'string',
	DateTime_Modified: 'DateTime',
};
module.exports = {
	schemas
};
