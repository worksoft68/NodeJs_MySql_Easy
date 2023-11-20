//**************************************************************************************************************************
//     This file cannot be used directly. You copy and paste this source to where you need it if needed 
//     After you have copied the source code, you can delete this file
//**************************************************************************************************************************


var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mysql');
const MainSchemas	 = require(__path_schemas + 'sys_permissions');
const LogModel = require(__path_models + 'systemlogs'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'sys_function_for_permissions';//use this parameter to check permissions: save, select, delete... 

async function saveItem_(item, userLogin){ 
	
	let data = {
		user_id: item.user_id,
		functions: item.functions,
		fullauthority: item.fullauthority,
		addnew: item.addnew,
		updates: item.updates,
		readonly: item.readonly,
		full_of_yourself: item.full_of_yourself,
		permission1: item.permission1,
		permission2: item.permission2,
		permission3: item.permission3,
		permission4: item.permission4,
		permission5: item.permission5,
		permission6: item.permission6,
		permission7: item.permission7,
		permission8: item.permission8,
		permission9: item.permission9,
		permission10: item.permission10,
	}
	if(item.id == ''){
		data["user_id_created"]		= userLogin.id; 
		data["user_name_created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
		data["datetime_created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if(result){
			let recordset = result.recordset;
			let item = recordset[0];
			data["id"] = item.id;
			status	= 201;
			success	= true;
		}
		LogModel.saveLog("Insert", MainSchemas.schemas.table, data.id, data, userLogin);
		return {
			success	: success,
			status	: status,
			action	: 'insert',
			data	: data,
			message	: result
		};
	}
	else{
		data["user_id_modified"]		= userLogin.id; 
		data["user_name_modified"]		=  userLogin.FirstName + ' '+ userLogin.LastName;
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
			LogModel.saveLog("Update", MainSchemas.schemas.table, data.id, data, userLogin);
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
		user_id: item.user_id,
		functions: item.functions,
		fullauthority: item.fullauthority,
		addnew: item.addnew,
		updates: item.updates,
		readonly: item.readonly,
		full_of_yourself: item.full_of_yourself,
		permission1: item.permission1,
		permission2: item.permission2,
		permission3: item.permission3,
		permission4: item.permission4,
		permission5: item.permission5,
		permission6: item.permission6,
		permission7: item.permission7,
		permission8: item.permission8,
		permission9: item.permission9,
		permission10: item.permission10,
	}
	data["user_id_created"]		= userLogin.id; 
	data["user_name_created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
	data["datetime_created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	if(item.id == ''){
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if(result){
			let recordset = result.recordset;
			let item = recordset[0];
			data["id"] = item.id;
			status	= 201;
			success	= true;
		}
		LogModel.saveLog("Insert", MainSchemas.schemas.table, data.id, data, userLogin);
		return {
			success	: success,
			status	: status,
			action	: 'insert',
			data	: data,
			message	: result
		};
	}
}


async function saveUpdate(item, userLogin){ 
	let data = {
		user_id: item.user_id,
		functions: item.functions,
		fullauthority: item.fullauthority,
		addnew: item.addnew,
		updates: item.updates,
		readonly: item.readonly,
		full_of_yourself: item.full_of_yourself,
		permission1: item.permission1,
		permission2: item.permission2,
		permission3: item.permission3,
		permission4: item.permission4,
		permission5: item.permission5,
		permission6: item.permission6,
		permission7: item.permission7,
		permission8: item.permission8,
		permission9: item.permission9,
		permission10: item.permission10,
	}
	data["user_id_modified"]		= userLogin.id; 
	data["user_name_modified"]		=  userLogin.FirstName + ' '+ userLogin.LastName;
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
		LogModel.saveLog("Update", MainSchemas.schemas.table, data.id, data, userLogin);
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
		LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.id, item_Old, userLogin);
	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,id);
}

async function deleteList(arrayId, userLogin = null){
	try{
		let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.id, functionBranch);
		if((permissionAccess.FullAuthority  != true) && (permissionAccess.FullOfYourself != true)) {
			return {
				success	: false,
				message	: 'You have no permission delete'
			};
		}
		let listId 			= arrayId["arrayId[]"];
		let isArray 		= Array.isArray(listId);
		if(isArray == false)
			listId = listId.split(",");
		let lengthListId 	= listId.length;
		let deleteSuccess 	= [];
		let deleteError 	= [];
		for(let i=0; i < lengthListId; i++){
			let resultOne = 'fales';
			try {
				let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, listId[i]);
				LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.id, item_Old, userLogin);
				resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,listId[i]);
			}
			catch(error){}
			if(resultOne == 'true'){
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
	let where  = " WHERE (id != 0) ";
	if(options != null) {
		if(options.functions != ""){
			dataParams.functions = "%" + options.functions + "%";
			where += " and (functions like @functions) ";
		}
	}
	let sql = `  SELECT A.id, A.user_id, A.functions, B.description, A.fullauthority, A.addnew, A.updates, A.readonly, A.full_of_yourself, A.permission1, A.permission2, A.permission3, A.permission4, A.permission5, A.permission6, A.permission7, A.permission8, A.permission9, A.permission10, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified datetime_modified 
			, COUNT(*) OVER() as TotalRecord
			FROM sys_permissions A inner join sys_function_for_permissions B on A.functions = B.function_name    ${where}
			ORDER BY id DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

async function listItems(params, userLogin, options = null){
	let dataParams = { };
	let skip = (params.pagination.currentPage-1) * params.pagination.totalItemsPerPage;
	let sql = "select top " + params.pagination.totalItemsPerPage + " * from(" +
		" SELECT A.id, A.user_id, A.functions, B.description, A.fullauthority, A.addnew, A.updates, A.readonly, A.full_of_yourself, A.permission1, A.permission2, A.permission3, A.permission4, A.permission5, A.permission6, A.permission7, A.permission8, A.permission9, A.permission10, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified "+
		", ROW_NUMBER() over(order by id desc) as RowNumber, COUNT(*) OVER() as TotalRecord " +
		" FROM sys_permissions A inner join sys_function_for_permissions B on A.functions = B.function_name  where (id > 0 )"; 
		if(options.functions != ""){
			dataParams.functions = "%" + options.functions + "%";
			sql += " and (functions like @functions) ";
		}
	sql += ") mainTable where RowNumber >= " + skip + " ";
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

async function getById( id, userLogin = null){
	let sql = ` SELECT A.id, A.user_id, A.functions, B.description, A.fullauthority, A.addnew, A.updates, A.readonly, A.full_of_yourself, A.permission1, A.permission2, A.permission3, A.permission4, A.permission5, A.permission6, A.permission7, A.permission8, A.permission9, A.permission10, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified
				FROM sys_permissions A
				inner join sys_function_for_permissions B on A.functions = B.function_name 
				where A.id = ${id} `;
	let results =  await dbConnection.selectQueryRecordset(sql);
	let result =  results[0];
	return result;
}


async function listItemForDropdown(){
	 let sql = ` SELECT id, user_id, functions, fullauthority, addnew, updates, readonly, full_of_yourself, permission1, permission2, permission3, permission4, permission5, permission6, permission7, permission8, permission9, permission10
			FROM sys_permissions  `;
	return  await dbConnection.selectQueryRecordset(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where  = "";
	where  = " WHERE (id != 0) ";
	if(item.functions != ""){
		dataParams.functions = "%" + item.functions + "%";
		where += " and (functions like @functions) ";
	}
	let sql = ` SELECT id, user_id, functions, fullauthority, addnew, updates, readonly, full_of_yourself, permission1, permission2, permission3, permission4, permission5, permission6, permission7, permission8, permission9, permission10, user_id_created, user_name_created, datetime_created, user_id_modified, user_name_modified, datetime_modified 
			FROM sys_permissions   ${where}
			ORDER BY id DESC`;
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
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
	exportData
};
