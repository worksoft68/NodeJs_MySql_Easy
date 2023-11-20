//**************************************************************************************************************************
//     Creation time: Friday, 02 June 2023 9:36 AM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	company_id: { min: 0, max: 4294967295 },
	name: { min: 1, max: 50 },
}

let validateSave = () => {	
	return [
		check('company_id', 'Message_Invalid_company_id').isInt({min: options.company_id.min, max: options.company_id.max}),
		check('name', 'Message_Invalid_name').isLength({ min: options.name.min, max: options.name.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
