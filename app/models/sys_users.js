var moment = require('moment');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var randomString = require("randomstring");
const dbConnection	= require(__path_helpers + 'utils-mysql');
const MainSchemas	 = require(__path_schemas + 'sys_users');
const SendEmail = require(__path_helpers + 'sendEmail');
const LogModel = require(__path_models + 'systemlogs'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'sys_users';//use this parameter to check permissions: save, select, delete.... 

async function saveItem_(item, userLogin){ 
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.id, functionBranch);
	if((permissionAccess.FullAuthority  != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		employee_code: item.employee_code,
		company_id: item.company_id,
		department_id: item.department_id,
		position_id: item.position_id,
		lastname: item.lastname,
		firstname: item.firstname,
		username: item.username,
		password: item.password,
		sex: item.sex,
		email: item.email,
		phonenumber: item.phonenumber,
		status: item.status,
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
	let checkExisting = await checkExistingAccount(item);
	if(checkExisting!=false){
		checkExisting["checkExistingAccount"] = true;		
		return {
			success	: false,
			status	: 406,
			action	: 'insert',
			data	: checkExisting,
			message	: 'AccountAlreadyExists'
		};
	}
	

	let data = {
		employee_code: item.employee_code,
		company_id: item.company_id,
		department_id: item.department_id,
		position_id: item.position_id,
		lastname: item.lastname,
		firstname: item.firstname,
		username: item.username,		
		sex: item.sex,
		email: item.email,
		phonenumber: item.phonenumber,
		status: item.status,
	}
	data["user_id_created"]		= userLogin.id; 
	data["user_name_created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
	data["datetime_created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	if(item.id == ''){		
		data["password"] =  md5(item.password_encrypted);// Encrypt one more time
		data["username_encrypted"] =  md5(item.username_encrypted);// Encrypt one more time

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
	let checkExisting = await checkExistingAccount_update(item);
	if(checkExisting!=false){
		checkExisting["checkExistingAccount"] = true;		
		return {
			success	: false,
			status	: 406,
			action	: 'insert',
			data	: checkExisting,
			message	: 'AccountAlreadyExists'
		};
	}	
	let data = {
		employee_code: item.employee_code,
		company_id: item.company_id,
		department_id: item.department_id,
		position_id: item.position_id,
		lastname: item.lastname,
		firstname: item.firstname,
		username: item.username,	
		sex: item.sex,
		email: item.email,
		phonenumber: item.phonenumber,
		status: item.status,
	}
	data["user_id_modified"]		= userLogin.id; 
	data["user_name_modified"]		=  userLogin.FirstName + ' '+ userLogin.LastName;
	data["datetime_modified"]		= moment(Date.now()).format(systemConfig.format_time_sql_system);
	data["username_encrypted"] 		=  md5(item.username_encrypted);// Encrypt one more time
	if(item.password != 'da39a3ee5e6b4b0d3255bfef95601890afd80709'){ 
		data["password"] =  md5(item.password_encrypted);// Encrypt one more time
	}

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

async function saveUpdateProfile(item, userLogin) {
	item.username_encrypted = md5(item.username_encrypted);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.id);	
	item["company_id"]		= item_Old.company_id;
	let checkExisting = await checkExistingAccount_update(item);
	if(checkExisting != false){
		checkExisting["checkExistingAccount"] = true;		
		return {
			success	: false,
			status	: 406,
			action	: 'insert',
			data	: checkExisting,
			message	: 'AccountAlreadyExists'
		};
	}	
	let data = {
		employee_code: item.employee_code,		
		department_id: item.department_id,		
		firstname: item.firstname,
		lastname: item.lastname,
		username: item.username,
		username_encrypted: item.username_encrypted,
		sex: item.sex,
		email: item.email,
		phonenumber: item.phonenumber,		
		avatar: item.avatar,		
		address: item.address,		
		birthday: moment(item.birthday).format(systemConfig.format_time_sql_system),		
	}
	data["user_id_modified"]		= userLogin.id; 
	data["user_name_modified"]		=  userLogin.FirstName + ' '+ userLogin.LastName;
	data["datetime_modified"]		= moment(Date.now()).format(systemConfig.format_time_sql_system);
	
	if (item_Old) {	
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.id);
		let status = 200;
		let success = true;
		if (result != true) {
			status = 406;
			success = false;
		}
		data["id"] = item.id;
		await LogModel.saveLog("Update", MainSchemas.schemas.table, data.id, data, userLogin);
		return {
			success: success,
			status: status,
			action: 'update',
			data: data,
			message: result
		};
	}
	else {
		return {
			success: false,
			status: 410,
			action: 'update',
			data: data,
			message: 'Not found data'
		};
	}
}

async function changePassword(passwordOld, passwordNew, userLogin) {
	let dataParams = {
		id: userLogin.id,
		password: passwordOld
	};
	let querySelect = " select * from sys_users where (password like :password) and (id like :id) ";
	let result =  await dbConnection.executeQuery(querySelect, dataParams);
	//let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, querySelect, dataParams);
	// let resultOld = result.recordset;
	if (result.length > 0) {
		let data = {
			password: passwordNew,
			time_changed_password: moment(Date.now()).format(systemConfig.format_time_sql_system)
		};
		let resultupdate = await dbConnection.updateAnything(MainSchemas.schemas, data, userLogin.id);
		//resultupdate = await dbConnection.updateAnything(MainSchemas.schemas, data, userLogin.id);
		return resultupdate;
	}
	return false;
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
		if((options.employee_code != "") && (options.employee_code != undefined)){
			dataParams.employee_code = "%" + options.employee_code + "%";
			where += " and (A.employee_code like :employee_code) ";
		}
		if((options.lastname != "") && (options.lastname != undefined)){
			dataParams.lastname = "%" + options.lastname + "%";
			where += " and (A.lastname like :lastname) ";
		}
		if((options.firstname != "") && (options.firstname != undefined)){
			dataParams.firstname = "%" + options.firstname + "%";
			where += " and (A.firstname like :firstname) ";
		}
		if((options.username != "") && (options.username != undefined)){
			dataParams.username = "%" + options.username + "%";
			where += " and (A.username like :username) ";
		}
		if((options.password != "") && (options.password != undefined)){
			dataParams.password = "%" + options.password + "%";
			where += " and (A.password like :password) ";
		}
		if((options.sex != "") && (options.sex != undefined)){
			dataParams.sex = "%" + options.sex + "%";
			where += " and (A.sex like :sex) ";
		}
		if((options.email != "") && (options.email != undefined)){
			dataParams.email = "%" + options.email + "%";
			where += " and (A.email like :email) ";
		}
		if((options.phonenumber != "") && (options.phonenumber != undefined)){
			dataParams.phonenumber = "%" + options.phonenumber + "%";
			where += " and (A.phonenumber like :phonenumber) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.id, A.employee_code, A.company_id, B.name as company_name, A.department_id, C.name as department_name , A.position_id, D.name as position_name , A.lastname, A.firstname, A.username, A.birthday, A.sex, A.email, A.phonenumber, A.address, A.district, A.provincial, A.nation, A.is_management, A.status, A.last_time_login, A.avatar, A.receive_email, A.receive_sms, A.full_path_temporary_save, A.temporary_file_name, A.path_temporary_save, A.manager_code, A.link_change_password, A.token_change_password, A.notification_time_changed_password, A.time_changed_password, A.browser_headers, A.is_status_login, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			, COUNT(*) OVER() as TotalRecord
			FROM sys_users A inner join sys_companies B on A.company_id = B.id inner join sys_departments C on A.department_id = C.id inner join sys_positions D on A.position_id = D.id    ${where}
			ORDER BY ${sort}
			LIMIT ${skip}, ${params.pagination.totalItemsPerPage}`;
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function checkExistingAccount(user){
	// let dataParams = { };	
	// dataParams.company_id = user.company_id;
	// dataParams.employee_code = user.employee_code;
	// dataParams.username = user.username;
	// dataParams.email = user.email;
	
	let dataParams = {	
		company_id : user.company_id,
		employee_code : user.employee_code,
		username : user.username,
		email : user.email
	};
	let sql = ` SELECT A.id, A.employee_code, A.company_id, B.name as company_name, A.department_id, C.name as department_name , A.position_id, D.name as position_name , A.lastname, A.firstname, A.username, A.birthday, A.sex, A.email, A.phonenumber, A.address, A.district, A.provincial, A.nation, A.is_management, A.status, A.last_time_login, A.avatar, A.receive_email, A.receive_sms, A.full_path_temporary_save, A.temporary_file_name, A.path_temporary_save, A.manager_code, A.link_change_password, A.token_change_password, A.notification_time_changed_password, A.time_changed_password, A.browser_headers, A.is_status_login, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified
	FROM sys_users A
	inner join sys_companies B on A.company_id = B.id inner join sys_departments C on A.department_id = C.id inner join sys_positions D on A.position_id = D.id 
	where ((A.company_id like :company_id) 
	and (A.employee_code like :employee_code)) or (A.email like :email) or (A.username like :username) `;
	let result =  await dbConnection.executeQuery(sql, dataParams);
	if(result.length > 0)
		return result[0];
	else
		return false;
}


async function checkExistingAccount_update(user){
	let dataParams = { 
		id : user.id,
		company_id : user.company_id,
		employee_code : user.employee_code,
		username : user.username,
		email : user.email
	};
	// dataParams.id = user.id;	
	// dataParams.company_id = user.company_id;
	// dataParams.employee_code = user.employee_code;
	// dataParams.username = user.username;
	// dataParams.email = user.email;
	let sql = ` SELECT A.id, A.employee_code, A.company_id, B.name as company_name, A.department_id, C.name as department_name , A.position_id, D.name as position_name , A.lastname, A.firstname, A.username, A.birthday, A.sex, A.email, A.phonenumber, A.address, A.district, A.provincial, A.nation, A.is_management, A.status, A.last_time_login, A.avatar, A.receive_email, A.receive_sms, A.full_path_temporary_save, A.temporary_file_name, A.path_temporary_save, A.manager_code, A.link_change_password, A.token_change_password, A.notification_time_changed_password, A.time_changed_password, A.browser_headers, A.is_status_login, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified
	FROM sys_users A
	inner join sys_companies B on A.company_id = B.id inner join sys_departments C on A.department_id = C.id inner join sys_positions D on A.position_id = D.id 
	where (((A.company_id like :company_id) and (A.employee_code like :employee_code))
	or (A.username like :username) or (A.email like :email)) and (A.id != :id)
	 `;
	;
	let result =  await dbConnection.executeQuery(sql, dataParams);	
	
	if(result.length > 0)
		return result[0];
	else
		return false;
}

async function getById( id, userLogin = null){
	let sql = ` SELECT A.id, A.employee_code, A.company_id, B.name as company_name, A.department_id, C.name as department_name , A.position_id, D.name as position_name , A.lastname, A.firstname, A.username, A.username_encrypted, '' as password, A.birthday, A.sex, A.email, A.phonenumber, A.address, A.district, A.provincial, A.nation, A.is_management, A.status, A.last_time_login, A.avatar, A.receive_email, A.receive_sms, A.full_path_temporary_save, A.temporary_file_name, A.path_temporary_save, A.manager_code, A.link_change_password, A.token_change_password, A.notification_time_changed_password, A.time_changed_password, A.browser_headers, A.is_status_login, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified
				FROM sys_users A
				inner join sys_companies B on A.company_id = B.id inner join sys_departments C on A.department_id = C.id inner join sys_positions D on A.position_id = D.id 
				where A.id = ${id} `;
	let result=  await dbConnection.executeQuery(sql);
	if(result.length>0)
		return result[0];
	else
		return result;
}


async function listItemForDropdown(){
	 let sql = ` SELECT id, concat(firstname,' ',lastname) as fullname, status FROM sys_users where status =1 `;
	return  await dbConnection.executeQuery(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where =" where (1) ";
	if((item.employee_code != "") && (item.employee_code != undefined)){
		dataParams.employee_code = "%" + item.employee_code + "%";
		where += " and (A.employee_code like :employee_code) ";
	}
	if((item.lastname != "") && (item.lastname != undefined)){
		dataParams.lastname = "%" + item.lastname + "%";
		where += " and (A.lastname like :lastname) ";
	}
	if((item.firstname != "") && (item.firstname != undefined)){
		dataParams.firstname = "%" + item.firstname + "%";
		where += " and (A.firstname like :firstname) ";
	}
	if((item.username != "") && (item.username != undefined)){
		dataParams.username = "%" + item.username + "%";
		where += " and (A.username like :username) ";
	}
	if((item.password != "") && (item.password != undefined)){
		dataParams.password = "%" + item.password + "%";
		where += " and (A.password like :password) ";
	}
	if((item.sex != "") && (item.sex != undefined)){
		dataParams.sex = "%" + item.sex + "%";
		where += " and (A.sex like :sex) ";
	}
	if((item.email != "") && (item.email != undefined)){
		dataParams.email = "%" + item.email + "%";
		where += " and (A.email like :email) ";
	}
	if((item.phonenumber != "") && (item.phonenumber != undefined)){
		dataParams.phonenumber = "%" + item.phonenumber + "%";
		where += " and (A.phonenumber like :phonenumber) ";
	}
	let sql = ` SELECT A.id, A.employee_code, A.company_id, B.name as company_name, A.department_id, C.name as department_name , A.position_id, D.name as position_name , A.lastname, A.firstname, A.username,   A.birthday, A.sex, A.email, A.phonenumber, A.address, A.district, A.provincial, A.nation, A.is_management, A.status, A.last_time_login, A.avatar, A.receive_email, A.receive_sms, A.full_path_temporary_save, A.temporary_file_name, A.path_temporary_save, A.manager_code, A.link_change_password, A.token_change_password, A.notification_time_changed_password, A.time_changed_password, A.browser_headers, A.is_status_login, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			 FROM sys_users A inner join sys_companies B on A.company_id = B.id inner join sys_departments C on A.department_id = C.id inner join sys_positions D on A.position_id = D.id   ${where} `;
	let result =  await dbConnection.executeQuery(sql, dataParams );
	return result;
}
//===========================================================================================================
async function getByIdCheckLogin(id) {
	try {
		let dataParams = {
			id: id
		};
		let sql = ` SELECT * FROM sys_users where (status = 1) and (id like :id)`;
		let result =  await dbConnection.executeQuery(sql, dataParams );
		if(result.length==1){
			let user = result[0];
			if((user.avatar=='')||(user.avatar==null)){
				user['avatar'] = 'User_no_avatar.png'; 
			}
			return user;
		}
		else
			return {};
	} catch(err) {
	}
	return {};
}

async function getUserByUserNameEncrypted(username_encrypted) {
	try {
		let dataParams = {
			username_encrypted: username_encrypted
		};
		let sql = " select * from sys_users where (username_encrypted like :username_encrypted) and (status=1)";
		let result =  await dbConnection.executeQuery(sql, dataParams );
		if(result.length==1)
			return result[0];
		else
			return {};
	}
	catch(err) { }
	return {};
}




async function getUserByEmail(Email) {
	try {
		let dataParams = {
			email: email
		};
		let sql = " select * from sys_users where 	email like :email ";
		let result =  await dbConnection.executeQuery(sql, dataParams );
		if(result.length==1)
			return result[0];
		else
			return {};
	}
	catch(err) { }
	return {};
}

async function userResetsPassword(item, url) {	
	let dataParams = {
		token_change_password: item.token_change_password,
		status: 1,
	};
	let sql = "select * from sys_users where (token_change_password like :token_change_password) and (status like :status) ";
	let resultOld =  await dbConnection.executeQuery(sql, dataParams );
	// let resultOld;
	// if(result.length==1){
	// 	resultOld = result[0];
	// }
	//let resultOld = result.recordset;
	if (resultOld.length > 0) {
		let strNotificationTimeChangedPassword = resultOld[0].notification_time_changed_password;
		var NotificationTimeChangedPassword = new Date(strNotificationTimeChangedPassword);
		let dateTimeNow = new Date();

		var totalSec = (dateTimeNow.getTime() - NotificationTimeChangedPassword.getTime()) / 1000;
		if (totalSec > 3600) { // 1h
			return false;
		}
		

		let data = {
			password: item.password,
			token_change_password: '',
			notification_time_changed_password: moment(Date.now()).format(systemConfig.format_time_sql_system)
		};
		//1111111111111111111
		resultupdate = await dbConnection.updateAnything(MainSchemas.schemas, data, resultOld[0].id);
		if((resultupdate!=1)&&(resultupdate!=true)&&(resultupdate!="true"))
			return false;
		var date = new Date();
		let email = "";
		let idEmail = " Id " + date.getDay().toString() + date.getMonth().toString() + date.getFullYear().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString();
		let subject = "Changed password"; + idEmail;
		let Body = "You just changed the password on the website " + url + "; " + idEmail;

		email = resultOld[0].email;
		if (email.length > 5) {
			let result = await SendEmail.sendEmail({
				email: email,
				subject: subject,
				message: Body
			});
		}


		return resultupdate;
	}
	return false;

}

async function forgotPassword(username_encrypted, url) {
	let dataParams = {
		username_encrypted: username_encrypted
	};
	let sql = " select * from sys_users where (username_encrypted like :username_encrypted) ";
	let resultOld =  await dbConnection.executeQuery(sql, dataParams );	
	if (resultOld.length > 0) {
		let data = {
			id: resultOld[0].id,
			token_change_password: randomString.generate({ length: 35, charset: 'alphanumeric' }),
			notification_time_changed_password: moment(Date.now()).format(systemConfig.format_time_sql_system)
		};
		let query = "Update sys_users set token_change_password = :token_change_password, notification_time_changed_password = :notification_time_changed_password   where (id = :id)";
		
		let resultupdate =  await dbConnection.executeQuery(query, data );
		if (resultupdate.affectedRows != 1) {
			return false;
		}	
		let prefixAdmin = "";	
		if(systemConfig.prefixAdmin!="")
			prefixAdmin = systemConfig.prefixAdmin+"/";
		url = url + prefixAdmin+"auth/login/forgotPassword/token/" + data.token_change_password;


		var date = new Date();
		let email = "";
		let idEmail = ". Id " + date.getDay().toString() + date.getMonth().toString() + date.getFullYear().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString();
		let subject = "Password Recovery"; + idEmail;
		let Body = "You or someone else reported forgetting the website's password ";
		Body += " You can click on the link below to reset your password: <a href=\"" + url + "\">" + url + "</a> or copy link <a href=\"" + url + "\">" + url + "</a> paste in the address bar of your web browser to reset the password <br /><br /> ";
		Body += "<br /> This email is valid for 60 minutes only. <br /> If you are not informed of forgot password, please ignore this email." + idEmail;

		email = resultOld[0].email;

		if (email.length < 3) {
			return false;
		}

		let result = await SendEmail.sendEmail({
			email: email,
			subject: subject,
			message: Body
		});
		return true;

	}
	return false;

}
async function getSignedJwtToken(user) {
	return jwt.sign({ id: user.id }, systemConfig.JWT_SECRET, {
		expiresIn: systemConfig.JWT_EXP
	})
}

module.exports = {
	saveItem_,
	saveInsert,
	saveUpdate,
	saveUpdateProfile,
	changePassword,
	deleteById,
	deleteList,
	listItems,
	listItems,
	getById,
	listItemForDropdown,
	exportData,
	getSignedJwtToken,
	getUserByUserNameEncrypted,
	getUserByEmail,
	forgotPassword,
	userResetsPassword,
	getByIdCheckLogin
};
