//**************************************************************************************************************************
//     Creation time: Friday, 02 June 2023 3:26 PM
//     Creator: 
//**************************************************************************************************************************
const util = require('util');

const options = {
	id: { min: 1, max: 50 },
	value_setting: { min: 1, max: 1000 },
	default_value: { min: 1, max: 1000 },
}

let validateSave = (obj, language) => {	
	let message = {};
	if((obj.id.length < options.id.min) || (obj.id.length > options.id.max)){
		message['id'] = util.format(language['Message_Invalid_id'], options.id.min, options.id.max);
	}
	if((obj.value_setting.length < options.value_setting.min) || (obj.value_setting.length > options.value_setting.max)){
		message['value_setting'] = util.format(language['Message_Invalid_value_setting'], options.value_setting.min, options.value_setting.max);
	}
	if((obj.default_value.length < options.default_value.min) || (obj.default_value.length > options.default_value.max)){
		message['default_value'] = util.format(language['Message_Invalid_default_value'], options.default_value.min, options.default_value.max);
	}
	if(Object.keys(message).length==0)
		return false;
	return message;	
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
