//**************************************************************************************************************************
//     Creation time: Friday, 02 June 2023 2:16 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');
const util = require('util');
const options = {
	employee_code: { min: 1, max: 15 },
	company_id: { min: 0, max: 4294967295 },
	department_id: { min: 0, max: 4294967295 },
	position_id: { min: 0, max: 4294967295 },
	lastname: { min: 1, max: 30 },
	firstname: { min: 1, max: 30 },
	username: { min: 1, max: 20 },
	password: { min: 1, max: 50 },
}

let validateSave = () => {	
	return [
		check('employee_code', 'Message_Invalid_employee_code').isLength({ min: options.employee_code.min, max: options.employee_code.max }),
		check('company_id', 'Message_Invalid_company_id').isInt({min: options.company_id.min, max: options.company_id.max}),
		check('department_id', 'Message_Invalid_department_id').isInt({min: options.department_id.min, max: options.department_id.max}),
		check('position_id', 'Message_Invalid_position_id').isInt({min: options.position_id.min, max: options.position_id.max}),
		check('lastname', 'Message_Invalid_lastname').isLength({ min: options.lastname.min, max: options.lastname.max }),
		check('firstname', 'Message_Invalid_firstname').isLength({ min: options.firstname.min, max: options.firstname.max }),
	];
}

let updateProfile = (obj, language) => {	
	let message = {};

	if((obj.employee_code < options.employee_code.min) || (obj.employee_code > options.employee_code.max)){
		message['employee_code'] = util.format(language['Message_Invalid_employee_code'], options.employee_code.min, options.employee_code.max);
	}
	if((obj.department_id < options.department_id.min) || (obj.department_id > options.department_id.max)){
		message['department_id'] = util.format(language['Message_Invalid_department_id'], options.department_id.min, options.department_id.max);
	}
	if((obj.lastname.length < options.lastname.min) || (obj.lastname.length > options.lastname.max)){
		message['lastname'] = util.format(language['Message_Invalid_lastname'], options.lastname.min, options.lastname.max);
	}
	if((obj.firstname.length < options.firstname.min) || (obj.firstname.length > options.firstname.max)){
		message['firstname'] = util.format(language['Message_Invalid_firstname'], options.firstname.min, options.firstname.max);
	}
	
	if(Object.keys(message).length==0)
		return false;
	return message;	
}

let validate = {
	validateSave,
	updateProfile,
	options,
};
module.exports = {validate};
