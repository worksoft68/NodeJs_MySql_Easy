var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mysql');
const MainSchemas	 = require(__path_schemas + 'sys_user_roles');
const LogModel = require(__path_models + 'systemlogs'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'sys_user_roles';//use this parameter to check permissions: save, select, delete.... 

async function saveItem_(item, userLogin){ 
	
	let data = {
		role_id: item.role_id,
		user_id: item.user_id,
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
		user_id: item.user_id,
	}
	data["user_id_created"]		= userLogin.id; 
	data["user_name_created"]	= userLogin.firstname + ' '+ userLogin.lastname; 
	data["datetime_created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	
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


async function saveUpdate(item, userLogin){ 
	let data = {
		role_id: item.role_id,
		user_id: item.user_id,
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

async function checkAlreadyExists( item, task = null){
	let dataParams = { };
	dataParams.role_id = item.role_id;
	dataParams.user_id = item.user_id;
	let sql ='';
	if(task=="Insert"){
		sql = ` SELECT * from sys_user_roles  where (role_id like :role_id) and (user_id like :user_id) `;
	}
	else{
		sql = ` SELECT * from sys_user_roles  where  (role_id like :role_id) and (user_id like :user_id)  and (id != ${item.id}) `;
	}	
	let result=  await dbConnection.executeQuery(sql,dataParams);
	if(result.length>0)
		return true;
	else
		return false;
	
}

async function deleteById(id, userLogin = null){
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, id);
	await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.id, item_Old, userLogin);
	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,id);
	//return false;
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
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.id, A.role_id, B.name, A.user_id, C.lastname, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			, COUNT(*) OVER() as TotalRecord
			FROM sys_user_roles A inner join sys_roles B on A.role_id = B.id inner join sys_users C on A.user_id = C.id    ${where}
			ORDER BY ${sort}
			LIMIT ${skip}, ${params.pagination.totalItemsPerPage}`;
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function getById( id, userLogin = null){
	let sql = ` SELECT A.id, A.role_id, B.name, A.user_id, C.lastname, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified
				FROM sys_user_roles A
				inner join sys_roles B on A.role_id = B.id inner join sys_users C on A.user_id = C.id 
				where A.id = ${id} `;
	let result=  await dbConnection.executeQuery(sql);
	if(result.length>0)
		return result[0];
	else
		return result;
}


async function listItemForDropdown(){
	 let sql = ` SELECT id, role_id, user_id
			FROM sys_user_roles  `;
	return  await dbConnection.executeQuery(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where =" where (1) ";
	let sql = ` SELECT A.id, A.role_id, B.name, A.user_id, C.lastname, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			 FROM sys_user_roles A inner join sys_roles B on A.role_id = B.id inner join sys_users C on A.user_id = C.id   ${where} `;
	let result =  await dbConnection.executeQuery(sql, dataParams );
	return result;
}

async function listItemsByUser(user_id) {
	let dataParams = {};
	dataParams.user_id = user_id;
	let sql = ` select ur.id, r.name as RoleName, ur.user_name_created, ur.datetime_created
				from sys_user_roles ur inner join sys_roles r 
						on ur.	role_id = r.id  WHERE (ur.user_id like :user_id)
					ORDER BY  r.name  desc `;
	return  await dbConnection.executeQuery(sql,dataParams);	
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
	listItemsByUser,
	checkAlreadyExists
};
