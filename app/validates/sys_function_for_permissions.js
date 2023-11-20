//**************************************************************************************************************************
//     Creation time: Saturday, 04 November 2023 4:32 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	function_name: { min: 1, max: 50 },
}

let validateSave = () => {	
	return [
		check('function_name', 'Message_Invalid_function_name').isLength({ min: options.function_name.min, max: options.function_name.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
