var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mysql');
const FileHelpers	= require(__path_helpers + 'file');
const publicFunction	= require(__path_helpers + 'publicFunction');
const MainSchemas	 = require(__path_schemas + 'sys_customsettings');
const LogModel = require(__path_models + 'systemlogs'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'sys_customsettings';//use this parameter to check permissions: save, select, delete.... 
const uploadFolder = 'public/uploads/'+functionBranch+'/';

async function saveItem_(item, userLogin){ 
	
	let data = {
		image_setting: item.image_setting,
		is_use_ckeditor: item.is_use_ckeditor,
		value_setting: item.value_setting,
		default_value: item.default_value,
		location: item.location,
		start_time: item.start_time,
		end_time: item.end_time,
		description: item.description,
		status: item.status,
		ordering: item.ordering,
		is_system: item.is_system,
	}
	if(item.id == ''){
		data["user_id_created"]		= userLogin.id; 
		data["user_name_created"]	= userLogin.firstname + ' '+ userLogin.lastname; 
		data["datetime_created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	data["id"] = item.id;
	let result = await dbConnection.addAnything(MainSchemas.schemas, data);
	let status	= 201;
	if(result != true) status = 406;
	await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.id, data, userLogin);
	return {
		success	: result,
		status	: status,
		action	: 'insert',
		data	: data,
		message	: result
	};
	}
	else{
		data["user_id_modified"]		= userLogin.id; 
		data["user_name_modified"]		=  userLogin.firstname + ' '+ userLogin.lastname;
		data["datetime_modified"]		= moment(Date.now()).format(systemConfig.format_time_sql_system);
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.id);
		if(item_Old){
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.id);
			let status = 200;
			let success = true;
			if(result != true){
				status = 406;
				success = false;
			}
			data["id"] = item.id;
			await LogModel.saveLog("Update", MainSchemas.schemas.table, data.id, data, userLogin);
			return {
				success	: success,
				status	: status,
				action	: 'update',
				data	: data,
				message	: result
			};
		}
		else{
			return {
				success	: false,
				status	: 410,
				action	: 'update',
				data	: data,
				message	: 'Not found data'
			};
		}
	}
}


async function saveInsert(item, userLogin){ 
	let data = {
		image_setting: item.image_setting,
		is_use_ckeditor: item.is_use_ckeditor,
		value_setting: publicFunction.decodeSpecialCharacters(item.value_setting),
		default_value: publicFunction.decodeSpecialCharacters(item.default_value),
		location: item.location,
		start_time: item.start_time,
		end_time: item.end_time,
		description: item.description,
		status: item.status,
		ordering: item.ordering,
		is_system: item.is_system,
	}
	// data["value_setting"]		= publicFunction.decodeSpecialCharacters(item.value_setting); 
	// data["default_value"]		= publicFunction.decodeSpecialCharacters(item.default_value); 
	data["user_id_created"]		= userLogin.id; 
	data["user_name_created"]	= userLogin.firstname + ' '+ userLogin.lastname; 
	data["datetime_created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	data["id"] = item.id;
	let result = await dbConnection.addAnything(MainSchemas.schemas, data);
	let status	= 201;
	if(result != true) status = 406;
	await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.id, data, userLogin);
	return {
		success	: result,
		status	: status,
		action	: 'insert',
		data	: data,
		message	: result
	};
}


async function saveUpdate(item, userLogin){ 
	let data = {
		image_setting: item.image_setting,
		is_use_ckeditor: item.is_use_ckeditor,
		value_setting: publicFunction.decodeSpecialCharacters(item.value_setting),
		default_value: publicFunction.decodeSpecialCharacters(item.default_value),
		location: item.location,
		start_time: item.start_time,
		end_time: item.end_time,
		description: item.description,
		status: item.status,
		ordering: item.ordering,
		is_system: item.is_system,
	}
	// data["value_setting"]		= publicFunction.decodeSpecialCharacters(item.value_setting); 
	// data["default_value"]		= publicFunction.decodeSpecialCharacters(item.default_value); 
	data["user_id_modified"]		= userLogin.id; 
	data["user_name_modified"]		=  userLogin.firstname + ' '+ userLogin.lastname;
	data["datetime_modified"]		= moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.id);
	if(item_Old){
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.id);
		let status = 200;
		let success = true;
		if(result != true){
			status = 406;
			success = false;
		}
		data["id"] = item.id;
		await LogModel.saveLog("Update", MainSchemas.schemas.table, data.id, data, userLogin);
		return {
			success	: success,
			status	: status,
			action	: 'update',
			data	: data,
			message	: result
		};
	}
	else{
		return {
			success	: false,
			status	: 410,
			action	: 'update',
			data	: data,
			message	: 'Not found data'
		};
	}
}

async function deleteById(id, userLogin = null){
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, id);
	await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.id, item_Old, userLogin);
	let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.image_setting);
	if (rerultDeleteFile) {
		return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,id);
	}
	else {
		return false;
	}
}

async function deleteList(arrayId, userLogin = null){
	try{
		let listId 			= arrayId["arrayId[]"];
		let isArray 		= Array.isArray(listId);
		if(isArray == false)
			listId = listId.split(",");
		let lengthListId 	= listId.length;
		let deleteSuccess 	= [];
		let deleteError 	= [];
		for(let i=0; i < lengthListId; i++){
			let resultOne = false;
			try {
				let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, listId[i]);
				await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.id, item_Old, userLogin);
				let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.image_setting);
				if (rerultDeleteFile) {
					resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,listId[i]);
				}
			}
			catch(error){}
			if(resultOne == true){
				deleteSuccess.push(listId[i]);
			}
			else {
				deleteError.push(listId[i]);
			}
		}
		return {
			success	: true,
			deleteSuccess,
			deleteError,
			message	: 'true'
		};
	}
	catch(error){}
	return {
		success	: false,
		message	: 'Error! Delete fail'
	};
}

async function listItems(params, userLogin, options = null){
	let dataParams = { };
	let skip = (params.pagination.currentPage-1) * params.pagination.totalItemsPerPage;
	let where  = " WHERE (1) ";
	let sort = " A.id DESC ";
	if(options != null) {
		if((options.image_setting != "") && (options.image_setting != undefined)){
			dataParams.image_setting = "%" + options.image_setting + "%";
			where += " and (A.image_setting like :image_setting) ";
		}
		if((options.value_setting != "") && (options.value_setting != undefined)){
			dataParams.value_setting = "%" + options.value_setting + "%";
			where += " and (A.value_setting like :value_setting) ";
		}
		if((options.default_value != "") && (options.default_value != undefined)){
			dataParams.default_value = "%" + options.default_value + "%";
			where += " and (A.default_value like :default_value) ";
		}
		if((options.location != "") && (options.location != undefined)){
			dataParams.location = "%" + options.location + "%";
			where += " and (A.location like :location) ";
		}
		if((options.description != "") && (options.description != undefined)){
			dataParams.description = "%" + options.description + "%";
			where += " and (A.description like :description) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.id, A.image_setting, A.is_use_ckeditor, A.value_setting, A.default_value, A.location, A.start_time, A.end_time, A.description, A.status, A.ordering, A.is_system, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			, COUNT(*) OVER() as TotalRecord
			FROM sys_customsettings A    ${where}
			ORDER BY ${sort}
			LIMIT ${skip}, ${params.pagination.totalItemsPerPage}`;
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function getById( id, userLogin = null){
	return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, id);
}


async function listItemForDropdown(){
	 let sql = ` SELECT id, image_setting, is_use_ckeditor, value_setting, default_value, location, start_time, end_time, description, status, ordering, is_system
			FROM sys_customsettings  `;
	return  await dbConnection.executeQuery(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where =" where (1) ";
	if((item.image_setting != "") && (item.image_setting != undefined)){
		dataParams.image_setting = "%" + item.image_setting + "%";
		where += " and (A.image_setting like :image_setting) ";
	}
	if((item.value_setting != "") && (item.value_setting != undefined)){
		dataParams.value_setting = "%" + item.value_setting + "%";
		where += " and (A.value_setting like :value_setting) ";
	}
	if((item.default_value != "") && (item.default_value != undefined)){
		dataParams.default_value = "%" + item.default_value + "%";
		where += " and (A.default_value like :default_value) ";
	}
	if((item.location != "") && (item.location != undefined)){
		dataParams.location = "%" + item.location + "%";
		where += " and (A.location like :location) ";
	}
	if((item.description != "") && (item.description != undefined)){
		dataParams.description = "%" + item.description + "%";
		where += " and (A.description like :description) ";
	}
	let sql = ` SELECT A.id, A.image_setting, A.is_use_ckeditor, A.value_setting, A.default_value, A.location, A.start_time, A.end_time, A.description, A.status, A.ordering, A.is_system, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			 FROM sys_customsettings A   ${where} `;
	let result =  await dbConnection.executeQuery(sql, dataParams );
	return result;
}
async function listItemsFrontend(){
	let sql = ` SELECT id, image_setting, value_setting, location, status, ordering
			FROM sys_customsettings where status = 1 order by ordering `;
	return  await dbConnection.executeQuery(sql); 
}

module.exports = {
	saveItem_,
	saveInsert,
	saveUpdate,
	deleteById,
	deleteList,
	listItems,
	listItems,
	getById,
	listItemForDropdown,
	exportData,
	listItemsFrontend
};
