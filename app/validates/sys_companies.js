//**************************************************************************************************************************
//     Creation time: Friday, 02 June 2023 9:33 AM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	name: { min: 1, max: 200 },
}

let validateSave = () => {	
	return [
		check('name', 'Message_Invalid_name').isLength({ min: options.name.min, max: options.name.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
