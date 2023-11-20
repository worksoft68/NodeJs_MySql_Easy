var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mysql');
const MainSchemas	 = require(__path_schemas + 'sys_role_permissions');
const LogModel = require(__path_models + 'systemlogs'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'sys_role_permissions';//use this parameter to check permissions: save, select, delete.... 

async function saveItem_(item, userLogin){ 
	
	let data = {
		role_id: item.role_id,
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
		data["user_name_created"]	= userLogin.firstname + ' '+ userLogin.lastname; 
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
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.id, data, userLogin);
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
		role_id: item.role_id,
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
	data["user_name_created"]	= userLogin.firstname + ' '+ userLogin.lastname; 
	data["datetime_created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	if(item.id == ''){
		let result = await dbConnection.addAnything(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if(result){
			if(result[0].affectedRows){
				data["id"] = result[0].insertId;
				status	= 201;
				success	= true;
				await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.id, data, userLogin);
			}
		}
			
			
			
			
			
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
		role_id: item.role_id,
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
	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,id);
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
				resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,listId[i]);
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
		if((options.functions != "") && (options.functions != undefined)){
			dataParams.functions = "%" + options.functions + "%";
			where += " and (A.functions like :functions) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.id, A.role_id, C.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, A.functions, B.description, A.fullauthority, A.addnew, A.updates, A.readonly, A.full_of_yourself, A.permission1, A.permission2, A.permission3, A.permission4, A.permission5, A.permission6, A.permission7, A.permission8, A.permission9, A.permission10, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			, COUNT(*) OVER() as TotalRecord
			FROM sys_role_permissions A inner join sys_roles C on A.role_id = C. inner join sys_function_for_permissions B on A.functions = B.function_name    ${where}
			ORDER BY ${sort}
			LIMIT ${skip}, ${params.pagination.totalItemsPerPage}`;
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function getById( id, userLogin = null){
	let sql = ` SELECT A.id, A.role_id, A.functions, B.description, A.fullauthority, A.addnew, A.updates, A.readonly, A.full_of_yourself, A.permission1, A.permission2, A.permission3, A.permission4, A.permission5, A.permission6, A.permission7, A.permission8, A.permission9, A.permission10, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified FROM sys_role_permissions A inner join sys_function_for_permissions B on A.functions = B.function_name where A.id = ${id} `;
	let result=  await dbConnection.executeQuery(sql);
	if(result.length>0)
		return result[0];
	else
		return result;
	
}
async function checkAlreadyExists( item, task = null){
	let dataParams = { };
	dataParams.role_id = item.role_id;
	dataParams.functions = item.functions;
	let sql ='';
	if(task=="Insert"){
		sql = ` SELECT * from sys_role_permissions  where   (role_id like :role_id) and (functions like :functions) `;
	}
	else{
		sql = ` SELECT * from sys_role_permissions  where   (role_id like :role_id) and (functions like :functions) and (id != ${item.id}) `;
	}	
	let result=  await dbConnection.executeQuery(sql,dataParams);
	if(result.length>0)
		return true;
	else
		return false;
	
}

async function listItemForDropdown(){
	 let sql = ` SELECT id, role_id, functions, fullauthority, addnew, updates, readonly, full_of_yourself, permission1, permission2, permission3, permission4, permission5, permission6, permission7, permission8, permission9, permission10
			FROM sys_role_permissions  `;
	return  await dbConnection.executeQuery(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where =" where (1) ";
	if((item.functions != "") && (item.functions != undefined)){
		dataParams.functions = "%" + item.functions + "%";
		where += " and (A.functions like :functions) ";
	}
	let sql = ` SELECT A.id, A.role_id, C.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, A.functions, B.description, A.fullauthority, A.addnew, A.updates, A.readonly, A.full_of_yourself, A.permission1, A.permission2, A.permission3, A.permission4, A.permission5, A.permission6, A.permission7, A.permission8, A.permission9, A.permission10, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			 FROM sys_role_permissions A inner join sys_roles C on A.role_id = C. inner join sys_function_for_permissions B on A.functions = B.function_name   ${where} `;
	let result =  await dbConnection.executeQuery(sql, dataParams );
	return result;
}
async function listItemsByRole(role_id) {
	let sql = ` SELECT rp.id, rp.role_id, rp.functions, f.description, rp.fullauthority
	, rp.addnew, rp.updates, rp.readonly, rp.full_of_yourself
	,permission1, permission2, permission3, permission4, permission5
	, permission6, permission7, permission8 ,permission9, permission10
	,rp.user_name_created, rp.datetime_created, rp.user_name_modified, rp.datetime_modified
	FROM sys_role_permissions rp left join sys_function_for_permissions f on rp.functions = f.function_name 
	where rp.role_id like :role_id order by  rp.functions asc
	`;
	let dataParams = {};
	dataParams.role_id = role_id;
	let result = await dbConnection.executeQuery(sql, dataParams);
	//console.log(result);
	// console.log(sql);
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
	listItemsByRole,
	checkAlreadyExists
};
