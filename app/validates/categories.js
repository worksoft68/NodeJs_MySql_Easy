//**************************************************************************************************************************
//     Creation time: Friday, 02 June 2023 4:31 PM
//     Creator: 
//**************************************************************************************************************************
const util = require('util');

const options = {
	name: { min: 1, max: 40 },
	slug: { min: 1, max: 40 },
	viewtype: { min: 1, max: 20 },
}

let validateSave = (obj, language) => {	
	let message = {};
	if((obj.name.length < options.name.min) || (obj.name.length > options.name.max)){
		message['name'] = util.format(language['Message_Invalid_name'], options.name.min, options.name.max);
	}
	if((obj.slug.length < options.slug.min) || (obj.slug.length > options.slug.max)){
		message['slug'] = util.format(language['Message_Invalid_slug'], options.slug.min, options.slug.max);
	}
	if((obj.viewtype.length < options.viewtype.min) || (obj.viewtype.length > options.viewtype.max)){
		message['viewtype'] = util.format(language['Message_Invalid_viewtype'], options.viewtype.min, options.viewtype.max);
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
