var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mysql');
const MainSchemas	 = require(__path_schemas + 'sys_permissions');
const LogModel = require(__path_models + 'systemlogs'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'sys_permissions';//use this parameter to check permissions: save, select, delete.... 

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

//grant access to this account the same as other accounts
async function rightsLikeUser(item, userLogin) {
	try {
		let list = await getByUserId(item.user_id_like);
		let n = list.length;
		let addSuccess = [];
		let addError = [];
		for (let i = 0; i < n; i++) {
			let itemAdd = list[i];
			let OldId = itemAdd.id;
			itemAdd.user_id = item.user_id;
			let sql = ` SELECT id FROM sys_permissions
						where (functions = N'${itemAdd.functions}') and (user_id = ${itemAdd.user_id})  `;
			let results = await dbConnection.executeQuery(sql);
			if (results.length > 0) {
				let result = results[0];
				itemAdd.id = result.id;
				let resultOne = await saveUpdate(itemAdd, userLogin)
				if (resultOne.success == true) {
					addSuccess.push(OldId);
				}
				else {
					addError.push(OldId);
				}
			} else {
				itemAdd.id = '';
				let resultOne = await saveInsert(itemAdd, userLogin)
				if (resultOne.success == true) {
					addSuccess.push(OldId);
				}
				else {
					addError.push(OldId);
				}
			}
		}
		return {
			success: true,
			addSuccess,
			addError,
			message: 'true'
		};
	}
	catch (err) { }
	return {
		success: false,
		message: 'RightsLikeUserFail'
	};
}

async function getByUserId(user_id) {
	let dataParams = {};
	let sql = "select  * from sys_permissions  where (user_id like :user_id ) ";
	dataParams.user_id = user_id;
	return result = await dbConnection.executeQuery(sql, dataParams);
	
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
		if((options.functions != "") && (options.functions != undefined)&& (options.functions != '-')){
			dataParams.functions = "%" + options.functions + "%";
			where += " and (A.functions like :functions) ";
		}

		if((options.user_id != "") && (options.user_id != undefined)&& (options.user_id != '-')){
			dataParams.user_id = options.user_id;
			where += " and (A.user_id like :user_id) ";
		}

		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.id, A.user_id, concat(C.firstname,' ',C.lastname) as fullname, A.functions, B.description as descriptionfunctions, A.fullauthority, A.addnew, A.updates, A.readonly, A.full_of_yourself, A.permission1, A.permission2, A.permission3, A.permission4, A.permission5, A.permission6, A.permission7, A.permission8, A.permission9, A.permission10, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			, COUNT(*) OVER() as TotalRecord
			FROM sys_permissions A inner join sys_function_for_permissions B on A.functions = B.function_name inner join sys_users C on A.user_id = C.id  ${where}
			ORDER BY ${sort}
			LIMIT ${skip}, ${params.pagination.totalItemsPerPage}`;
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function getById( id, userLogin = null){
	let sql = ` SELECT A.id, A.user_id, concat(C.firstname,' ',C.lastname) as fullname, A.functions, B.description as descriptionfunctions, A.fullauthority, A.addnew, A.updates, A.readonly, A.full_of_yourself, A.permission1, A.permission2, A.permission3, A.permission4, A.permission5, A.permission6, A.permission7, A.permission8, A.permission9, A.permission10, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified
				FROM sys_permissions A inner join sys_function_for_permissions B on A.functions = B.function_name 
				inner join sys_users C on A.user_id = C.id 
				where A.id = ${id} `;
		let result=  await dbConnection.executeQuery(sql);
		if(result.length>0)
			return result[0];
		else
			return result;
}


async function listItemForDropdown(){
	 let sql = ` SELECT id, user_id, functions, fullauthority, addnew, updates, readonly, full_of_yourself, permission1, permission2, permission3, permission4, permission5, permission6, permission7, permission8, permission9, permission10
			FROM sys_permissions  `;
	return  await dbConnection.executeQuery(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where =" where (1) ";
	if((item.functions != "") && (item.functions != undefined)){
		dataParams.functions = "%" + item.functions + "%";
		where += " and (A.functions like :functions) ";
	}
	let sql = ` SELECT A.id, A.user_id, concat(C.firstname,' ',C.lastname) as fullname, A.functions, B.description as descriptionfunctions, A.fullauthority, A.addnew, A.updates, A.readonly, A.full_of_yourself, A.permission1, A.permission2, A.permission3, A.permission4, A.permission5, A.permission6, A.permission7, A.permission8, A.permission9, A.permission10, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			 FROM sys_permissions A inner join sys_function_for_permissions B on A.functions = B.function_name inner join sys_users C on A.user_id = C.id    ${where} `;
	let result =  await dbConnection.executeQuery(sql, dataParams );
	return result;
}

async function getPermissionByFunction(user_id, functionName) {
	let sql = " select * from sys_permissions where  (user_id = " + user_id + ") and (functions = '" + functionName + "') ";
	//console.log(sql);
	let results =  await dbConnection.executeQuery(sql);	
	if (results.length > 0) {
		return results[0];
	}
	return { status: "false" };

	
}

async function getRolePermissionByFunction(user_id, functionName) {
	let sql = " select distinct ur.id as IdUR , ur.id, ur.role_id, rp.* from sys_user_roles ur inner join sys_role_permissions rp on ur.role_id = rp.role_id where (ur.user_id like " + user_id + ") and (rp.functions like '" + functionName + "') ";
	//console.log(sql);
	let results =  await dbConnection.executeQuery(sql);
	if (results.length > 0) {
		return results[0];
	}
	return { status: "false" };
}

async function checkPermissionAccess(idUser, functionName, res) {
	let permissionAccess = await checkPermissionAccessInPermission(idUser, functionName);
	let roleAccess = await checkRoleAccess(idUser, functionName);
	if ((permissionAccess != true) && (roleAccess != true)) {

		res.render(`${folderView}no-permission`, { pageTitle: 'No Permission ', top_post: false });
		// res.redirect('./');
		// res.render(`${folderView}no-permission`, { layout: false,  top_post: false});
	}
}

async function checkPermissionAccessInPermission(idUser, functionBranch) {
	let permissionAccess = await getPermissionByFunction(idUser, functionBranch);
	if ((permissionAccess.fullauthority != true) && (permissionAccess.full_of_yourself != true) && (permissionAccess.readonly != true)) {
		return false;
	}
	return true;
}

async function checkRoleAccess(idUser, functionBranch) {
	let permissionAccess = await getRolePermissionByFunction(idUser, functionBranch);
	if ((permissionAccess.fullauthority != true) && (permissionAccess.full_of_yourself != true) && (permissionAccess.readonly != true)) {
		return false;
	}
	return true;

}


//Check permission is allowed to save?
//There are 2 ways to assign permissions. In the Sys_Permission table and the Sys_Role_Permission table
async function save(userLogin, functionBranch) {
	let savePermission = await chekSavePermission(userLogin, functionBranch);
	let saveRole = await checkSaveRole(userLogin, functionBranch);
	// console.log(savePermission);
	// console.log('savePermission');
	// console.log(saveRole);
	// console.log('saveRole');

	if ((savePermission != true) && (saveRole != true)) {
		return {
			success: false,
			status: 405,
			action: 'save',
			data: '',
			message: 'You dont have permission to save'
		};
	}
	return true;
}

//Check permissions save in table Sys_Permission
async function chekSavePermission(userLogin, functionBranch) {
	let permissionAccess = await getPermissionByFunction(userLogin.id, functionBranch);
	if ((permissionAccess.fullauthority == true) || (permissionAccess.addnew == true) || (permissionAccess.full_of_yourself == true)) {
		return true;
	}
	return false;
}

//Check permissions save in role, tabe Sys_Role_Permission
async function checkSaveRole(userLogin, functionBranch) {
	let permissionAccess = await getRolePermissionByFunction(userLogin.id, functionBranch);
	if ((permissionAccess.fullauthority == true) || (permissionAccess.addnew == true) || (permissionAccess.full_of_yourself == true)) {
		return true;
	}
	return false;
}

//Check permission is allowed to get data?
//There are 2 ways to assign permissions. In the Sys_Permission table and the Sys_Role_Permission table
async function getData(userLogin, functionBranch) {
	let getDataPermission = await chekGetDataPermission(userLogin, functionBranch);
	let getDataRole = await chekGetDataRole(userLogin, functionBranch);
	if ((getDataPermission != true) && (getDataRole != true)) {
		return {
			success: false,
			status: 405,
			action: 'getDataById',
			data: '',
			message: 'You have no permission get data'
		};
	}
	return true;
}
//Check permissions get data  in table Sys_Permission
async function chekGetDataPermission(userLogin, functionBranch) {
	let permissionAccess = await getPermissionByFunction(userLogin.id, functionBranch);
	if ((permissionAccess.fullauthority == true) || (permissionAccess.full_of_yourself == true) || (permissionAccess.readonly == true)) {
		return true;
	}
	return false;
}
//Check permissions get data in role, tabe Sys_Role_Permission
async function chekGetDataRole(userLogin, functionBranch) {
	let permissionAccess = await getRolePermissionByFunction(userLogin.id, functionBranch);
	if ((permissionAccess.fullauthority == true) || (permissionAccess.full_of_yourself == true) || (permissionAccess.readonly == true)) {
		return true;
	}
	return false;
}

//Check permission is allowed to get delete?
//There are 2 ways to assign permissions. In the Sys_Permission table and the Sys_Role_Permission table
async function deleteItem(userLogin, functionBranch) {
	let deleteItemPermission = await checkDeleteItemPermission(userLogin, functionBranch);
	let deleteItemRole = await checkDeleteItemRole(userLogin, functionBranch);

	if ((deleteItemPermission != true) && (deleteItemRole != true)) {
		return {
			success: false,
			status: 405,
			action: 'delete',
			data: '',
			message: 'You have no permission delete'
		};
	}
	return true;
}
//Check permissions delete data in table Sys_Permission
async function checkDeleteItemPermission(userLogin, functionBranch) {
	let permissionAccess = await getPermissionByFunction(userLogin.id, functionBranch);
	if ((permissionAccess.readonly == true))
		return false;// no Permission 
	if ((permissionAccess.fullauthority == true) || (permissionAccess.full_of_yourself == true)) {
		return true;
	}
	return false;//// no Permission 
}
//Check permissions delete data in role, tabe Sys_Role_Permission
async function checkDeleteItemRole(userLogin, functionBranch) {
	let permissionAccess = await getRolePermissionByFunction(userLogin.id, functionBranch);
	if ((permissionAccess.readonly == true))
		return false;// no Permission 
	if ((permissionAccess.fullauthority == true) || (permissionAccess.full_of_yourself == true)) {
		return true;
	}
	return false;//// no Permission 
}

module.exports = {
	saveItem_,
	saveInsert,
	rightsLikeUser,
	getByUserId,
	saveUpdate,
	deleteById,
	deleteList,
	listItems,	
	getById,
	listItemForDropdown,
	exportData,

	getPermissionByFunction,
	checkPermissionAccess,
	save,
	chekSavePermission,
	checkSaveRole,
	getData,
	chekGetDataPermission,
	chekGetDataRole,
	deleteItem,
	checkDeleteItemPermission,
	checkDeleteItemRole
};
