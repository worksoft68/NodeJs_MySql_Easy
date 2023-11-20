//**************************************************************************************************************************
//     Creation time: Friday, 02 June 2023 9:33 AM
//     Creator: 
//**************************************************************************************************************************
var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mysql');
const MainSchemas	 = require(__path_schemas + 'sys_companies');
const LogModel = require(__path_models + 'systemlogs'); 
const systemConfig = require(__path_configs + 'system');

async function saveItem_(item, userLogin){ 
	let data = {
		name: item.name,
		address: item.address,
		email1: item.email1,
		phone_number1: item.phone_number1,
		note: item.note,
		bank_account_number1: item.bank_account_number1,
		bank_name1: item.bank_name1,
		status: item.status,
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
		name: item.name,
		address: item.address,
		email1: item.email1,
		phone_number1: item.phone_number1,
		note: item.note,
		bank_account_number1: item.bank_account_number1,
		bank_name1: item.bank_name1,
		status: item.status,
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
		name: item.name,
		address: item.address,
		email1: item.email1,
		phone_number1: item.phone_number1,
		note: item.note,
		bank_account_number1: item.bank_account_number1,
		bank_name1: item.bank_name1,
		status: item.status,
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
	let dataParams = {
		id: id
	};
	let sql = ` delete from sys_companies 
		where (id like :id) 
	`;
	return  await dbConnection.deleteObject(sql, dataParams);
//	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,id);
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
				let dataParams = {
					id: listId[i]
				};
				let sql = ` delete from sys_companies 
					where (id like :id) 
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
	let sort = " A.id DESC ";
	if(options != null) {
		if((options.name != "") && (options.name != undefined)){
			dataParams.name = "%" + options.name + "%";
			where += " and (A.name like :name) ";
		}
		if((options.address != "") && (options.address != undefined)){
			dataParams.address = "%" + options.address + "%";
			where += " and (A.address like :address) ";
		}
		if((options.email1 != "") && (options.email1 != undefined)){
			dataParams.email1 = "%" + options.email1 + "%";
			where += " and (A.email1 like :email1) ";
		}
		if((options.phone_number1 != "") && (options.phone_number1 != undefined)){
			dataParams.phone_number1 = "%" + options.phone_number1 + "%";
			where += " and (A.phone_number1 like :phone_number1) ";
		}
		if((options.note != "") && (options.note != undefined)){
			dataParams.note = "%" + options.note + "%";
			where += " and (A.note like :note) ";
		}
		if((options.bank_account_number1 != "") && (options.bank_account_number1 != undefined)){
			dataParams.bank_account_number1 = "%" + options.bank_account_number1 + "%";
			where += " and (A.bank_account_number1 like :bank_account_number1) ";
		}
		if((options.bank_name1 != "") && (options.bank_name1 != undefined)){
			dataParams.bank_name1 = "%" + options.bank_name1 + "%";
			where += " and (A.bank_name1 like :bank_name1) ";
		}
		if((options.status != "") && (options.status != "-")&& (options.status != "novalue") && (options.status != undefined)){
			dataParams.status = "%" + options.status + "%";
			where += " and (A.status like :status) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.id, A.name, A.address, A.provincial, A.district, A.email1, A.email2, A.phone_number1, A.phone_number2, A.number_worker, A.note, A.renewal_date, A.expiration_date, A.representative_name, A.link_facebook, A.registration_amount, A.registered_storage, A.registered_sms, A.registration_amount_sms, A.bank_account_number1, A.bank_name1, A.bank_account_number2, A.bank_name2, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			, COUNT(*) OVER() as TotalRecord
			FROM sys_companies A    ${where}
			ORDER BY ${sort}
			LIMIT ${skip}, ${params.pagination.totalItemsPerPage}`;
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function getById( id, userLogin = null){
	let dataParams = {
		id : id,
	};
	//return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, id);
	let sql = ` SELECT A.id, A.name, A.address, A.provincial, A.district, 
		A.email1, A.email2, A.phone_number1, A.phone_number2, A.number_worker, A.note, 
		A.renewal_date, A.expiration_date, A.representative_name, A.link_facebook, A.registration_amount, A.registered_storage, 
		A.registered_sms, A.registration_amount_sms, A.bank_account_number1, A.bank_name1, A.bank_account_number2, A.bank_name2, 
		A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, 
		A.datetime_modified 
		FROM sys_companies as A
		where (A.id = :id) `; 
	return await  await dbConnection.selectOne(sql, dataParams );
}


async function listItemForDropdown(){
	 let sql = ` SELECT id, name, address, email1, phone_number1, note, bank_account_number1, bank_name1, status
			FROM sys_companies  `;
	return  await dbConnection.executeQuery(sql); 
}

async function exportData(options, userLogin){
	let dataParams = { };
	let where =" where (1) ";
		if((options.name != "") && (options.name != undefined)){
			dataParams.name = "%" + options.name + "%";
			where += " and (A.name like :name) ";
		}
		if((options.address != "") && (options.address != undefined)){
			dataParams.address = "%" + options.address + "%";
			where += " and (A.address like :address) ";
		}
		if((options.email1 != "") && (options.email1 != undefined)){
			dataParams.email1 = "%" + options.email1 + "%";
			where += " and (A.email1 like :email1) ";
		}
		if((options.phone_number1 != "") && (options.phone_number1 != undefined)){
			dataParams.phone_number1 = "%" + options.phone_number1 + "%";
			where += " and (A.phone_number1 like :phone_number1) ";
		}
		if((options.note != "") && (options.note != undefined)){
			dataParams.note = "%" + options.note + "%";
			where += " and (A.note like :note) ";
		}
		if((options.bank_account_number1 != "") && (options.bank_account_number1 != undefined)){
			dataParams.bank_account_number1 = "%" + options.bank_account_number1 + "%";
			where += " and (A.bank_account_number1 like :bank_account_number1) ";
		}
		if((options.bank_name1 != "") && (options.bank_name1 != undefined)){
			dataParams.bank_name1 = "%" + options.bank_name1 + "%";
			where += " and (A.bank_name1 like :bank_name1) ";
		}
		if((options.status != "") && (options.status != "-")&& (options.status != "novalue") && (options.status != undefined)){
			dataParams.status = "%" + options.status + "%";
			where += " and (A.status like :status) ";
		}
	let sql = ` SELECT A.id, A.name, A.address, A.provincial, A.district, A.email1, A.email2, A.phone_number1, A.phone_number2, A.number_worker, A.note, A.renewal_date, A.expiration_date, A.representative_name, A.link_facebook, A.registration_amount, A.registered_storage, A.registered_sms, A.registration_amount_sms, A.bank_account_number1, A.bank_name1, A.bank_account_number2, A.bank_name2, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			 FROM sys_companies A   ${where} `;
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
