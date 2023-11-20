//**************************************************************************************************************************
//     Creation time: Thursday, 01 June 2023 4:36 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	name: { min: 1, max: 50 },
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
