//**************************************************************************************************************************
//     Creation time: Friday, 02 June 2023 2:00 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	user_id: { min: 1, max: 4294967295 },
	functions: { min: 1, max: 50 },
}

let validateSave = () => {	
	return [
		check('user_id', 'Message_Invalid_user_id').isInt({min: options.user_id.min, max: options.user_id.max}),
		check('functions', 'Message_Invalid_functions').isLength({ min: options.functions.min, max: options.functions.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
