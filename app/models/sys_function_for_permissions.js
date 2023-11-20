//**************************************************************************************************************************
//     Creation time: Saturday, 04 November 2023 4:32 PM
//     Creator: 
//**************************************************************************************************************************
var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mysql');
const MainSchemas	 = require(__path_schemas + 'sys_function_for_permissions');
const LogModel = require(__path_models + 'systemlogs'); 
const systemConfig = require(__path_configs + 'system');

async function saveItem_(item, userLogin){ 
	let data = {
		description: item.description,
		note: item.note,
		modulesystem: item.modulesystem,
		status: item.status,
	}
	if(item.function_name == ''){
		data["user_id_created"]		= userLogin.id; 
		data["user_name_created"]	= userLogin.firstname + ' '+ userLogin.lastname; 
		data["datetime_created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	data["function_name"] = item.function_name;
	let result = await dbConnection.addAnything(MainSchemas.schemas, data);
	let status	= 201;
	if(result != true) status = 406;
	await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.function_name, data, userLogin);
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
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.function_name);
		if(item_Old){
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.function_name);
			let status = 200;
			let success = true;
			if(result != true){
				status = 406;
				success = false;
			}
			data["function_name"] = item.function_name;
			await LogModel.saveLog("Update", MainSchemas.schemas.table, data.function_name, data, userLogin);
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
		description: item.description,
		note: item.note,
		modulesystem: item.modulesystem,
		status: item.status,
	}
	data["user_id_created"]		= userLogin.id; 
	data["user_name_created"]	= userLogin.firstname + ' '+ userLogin.lastname; 
	data["datetime_created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	data["function_name"] = item.function_name;
	let result = await dbConnection.addAnything(MainSchemas.schemas, data);
	let status	= 201;
	if(result != true) status = 406;
	await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.function_name, data, userLogin);
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
		description: item.description,
		note: item.note,
		modulesystem: item.modulesystem,
		status: item.status,
	}
	data["user_id_modified"]		= userLogin.id; 
	data["user_name_modified"]		=  userLogin.firstname + ' '+ userLogin.lastname;
	data["datetime_modified"]		= moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.function_name);
	if(item_Old){
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.function_name);
		let status = 200;
		let success = true;
		if(result != true){
			status = 406;
			success = false;
		}
		data["function_name"] = item.function_name;
		await LogModel.saveLog("Update", MainSchemas.schemas.table, data.function_name, data, userLogin);
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

async function deleteById(function_name, userLogin = null){
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, function_name);
	await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.function_name, item_Old, userLogin);
	let dataParams = {
		function_name: function_name
	};
	let sql = ` delete from sys_function_for_permissions 
		where (function_name like :function_name) 
	`;
	return  await dbConnection.deleteObject(sql, dataParams);
//	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,function_name);
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
				await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.function_name, item_Old, userLogin);
				let dataParams = {
					function_name: listId[i]
				};
				let sql = ` delete from sys_function_for_permissions 
					where (function_name like :function_name) 
				`;
				resultOne =  await dbConnection.deleteObject(sql, dataParams);
//					resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, listId[i]);
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
	let sort = " A.function_name DESC ";
	if(options != null) {
		if((options.description != "") && (options.description != undefined)){
			dataParams.description = "%" + options.description + "%";
			where += " and (A.description like :description) ";
		}
		if((options.note != "") && (options.note != undefined)){
			dataParams.note = "%" + options.note + "%";
			where += " and (A.note like :note) ";
		}
		if((options.modulesystem != "") && (options.modulesystem != undefined)){
			dataParams.modulesystem = "%" + options.modulesystem + "%";
			where += " and (A.modulesystem like :modulesystem) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.function_name, A.description, A.note, A.modulesystem, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			, COUNT(*) OVER() as TotalRecord
			FROM sys_function_for_permissions A    ${where}
			ORDER BY ${sort}
			LIMIT ${skip}, ${params.pagination.totalItemsPerPage}`;
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function getById( function_name, userLogin = null){
	let dataParams = {
		function_name : function_name,
	};
	//return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, function_name);
	let sql = ` SELECT A.function_name, A.description, A.note, A.modulesystem, A.status, 
		A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
		FROM sys_function_for_permissions as A
		where (A.function_name = :function_name) `; 
	return await  await dbConnection.selectOne(sql, dataParams );
}


async function listItemForDropdown(){
	 let sql = ` SELECT function_name, description, note, modulesystem, status
			FROM sys_function_for_permissions  `;
	return  await dbConnection.executeQuery(sql); 
}

async function exportData(options, userLogin){
	let dataParams = { };
	let where =" where (1) ";
		if((options.description != "") && (options.description != undefined)){
			dataParams.description = "%" + options.description + "%";
			where += " and (A.description like :description) ";
		}
		if((options.note != "") && (options.note != undefined)){
			dataParams.note = "%" + options.note + "%";
			where += " and (A.note like :note) ";
		}
		if((options.modulesystem != "") && (options.modulesystem != undefined)){
			dataParams.modulesystem = "%" + options.modulesystem + "%";
			where += " and (A.modulesystem like :modulesystem) ";
		}
	let sql = ` SELECT A.function_name, A.description, A.note, A.modulesystem, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			 FROM sys_function_for_permissions A   ${where} `;
	let result =  await dbConnection.executeQuery(sql, dataParams );
	return result;
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
};
