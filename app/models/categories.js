var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mysql');
const FileHelpers	= require(__path_helpers + 'file');
const MainSchemas	 = require(__path_schemas + 'categories');
const LogModel = require(__path_models + 'systemlogs'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'categories';//use this parameter to check permissions: save, select, delete.... 
const uploadFolder = 'public/uploads/'+functionBranch+'/';

async function saveItem_(item, userLogin){ 
	
	let data = {
		parent_id: item.parent_id,
		name: item.name,
		slug: item.slug,
		thumbnail: item.thumbnail,
		viewtype: item.viewtype,
		link: item.link,
		is_show_homepage: item.is_show_homepage,
		ordering: item.ordering,
		description: item.description,
		status: item.status,
	}
	if(item.id == ''){
		data["companies_id"]		= userLogin.company_id; 
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
		companies_id: userLogin.company_id,		
		name: item.name,
		slug: item.slug,
		thumbnail: item.thumbnail,
		viewtype: item.viewtype,
		link: item.link,
		is_show_homepage: item.is_show_homepage,
		ordering: item.ordering,
		description: item.description,
		status: item.status,
	}
	if((item.parent_id != '-') && (item.parent_id != ''))
		data["parent_id"] = item.parent_id;
	else data["parent_id"] = 0;
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
		slug: item.slug,
		thumbnail: item.thumbnail,
		viewtype: item.viewtype,
		link: item.link,
		zone: item.zone,
		is_show_homepage: item.is_show_homepage,
		ordering: item.ordering,
		description: item.description,
		status: item.status,
	}
	if((item.parent_id != '-') && (item.parent_id != ''))
		data["parent_id"] = item.parent_id;
	else data["parent_id"] = 0;
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
	let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.thumbnail);
	if (rerultDeleteFile) {
		let dataParams = {
			companies_id: userLogin.company_id,
			id: id
		};					
		let sql = ` delete from ${MainSchemas.schemas.table} 
			where (id like :id) and (companies_id like :companies_id)
		`;					
		return  await dbConnection.deleteObject(sql, dataParams);			
		//return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,id);
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
				let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.thumbnail);
				if (rerultDeleteFile) {
					let dataParams = {
						companies_id: userLogin.company_id,
						id: listId[i]
					};					
					let sql = ` delete from ${MainSchemas.schemas.table} 
						where (id like :id) and (companies_id like :companies_id) `;
					resultOne =  await dbConnection.deleteObject(sql, dataParams);
					//resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,listId[i]);
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
	let where  = " WHERE (A.companies_id like :companies_id) ";
	dataParams["companies_id"] = userLogin.company_id;
	let sort = " A.id DESC ";
	if(options != null) {

		if((options.parent_id != "") && (options.parent_id != undefined)){
			dataParams.parent_id = item.parent_id;
			where += " and (A.parent_id like :parent_id) ";
		}
		
		if((options.name != "") && (options.name != undefined)){
			dataParams.name = "%" + options.name + "%";
			where += " and (A.name like :name) ";
		}
		if((options.slug != "") && (options.slug != undefined)){
			dataParams.slug = "%" + options.slug + "%";
			where += " and (A.slug like :slug) ";
		}
		
		if((options.viewtype != "") && (options.viewtype != undefined)&& (options.viewtype != "novalue")){
			dataParams.viewtype = "%" + options.viewtype + "%";
			where += " and (A.viewtype like :viewtype) ";
		}
		if((options.status != "") && (options.status != undefined)&& (options.status != "novalue")){
			dataParams.status = "%" + options.status + "%";
			where += " and (A.status like :status) ";
		}

		if((options.description != "") && (options.description != undefined)){
			dataParams.description = "%" + options.description + "%";
			where += " and (A.description like :description) ";
		}

		

		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}

		

	}
	let sql = `  SELECT A.id, A.parent_id , CParent.name as nameParent , A.companies_id, A.name, A.slug, A.thumbnail, A.viewtype, A.link , A.is_show_homepage, A.ordering, A.description, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
			, COUNT(*) OVER() as TotalRecord
			FROM categories A  left join categories as CParent on A.parent_id = CParent.id   ${where}
			ORDER BY ${sort}
			LIMIT ${skip}, ${params.pagination.totalItemsPerPage}`;

			//console.log(sql);
			// console.log(dataParams);
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function getById(id, userLogin = null){
	try{
	let dataParams = { 
		id: id,
		companies_id:userLogin.company_id
	};	
	let sql = ` SELECT A.id, A.parent_id , CParent.name as nameParent 
				, A.companies_id, A.name, A.slug, A.thumbnail, A.viewtype, A.link, A.zone
				, A.is_show_homepage, A.ordering, A.description, A.status
				, A.user_id_created, A.user_name_created, A.datetime_created
				, A.user_id_modified, A.user_name_modified, A.datetime_modified 			
			FROM categories A  left join categories as CParent on A.parent_id = CParent.id 
			where ( A.id = :id ) and (A.companies_id like :companies_id)
			`;
	let result =  await dbConnection.executeQuery(sql, dataParams);	
	// console.log(sql);
	// console.log(dataParams);
	//console.log(result);
	if(result.length>0)
		return result[0]
	return result;
	}
	catch(err){
		console.log(err);
	}
	return false;
	//return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, id);
}




async function listItemForDropdown(userLogin){
	 let sql = ` SELECT id, name
			FROM categories  where (status ='Active') and (companies_id = ${userLogin.company_id}) `;
	return  await dbConnection.executeQuery(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where =" where (1) ";

	dataParams["companies_id"] = userLogin.company_id;
		where += " and (A.companies_id like :companies_id) ";

	if((item.parent_id != "") && (item.parent_id != undefined)){
		dataParams.parent_id = item.parent_id;
		where += " and (A.parent_id like :parent_id) ";
	}

	if((item.name != "") && (item.name != undefined)){
		dataParams.name = "%" + item.name + "%";
		where += " and (A.name like :name) ";
	}
	if((item.slug != "") && (item.slug != undefined)){
		dataParams.slug = "%" + item.slug + "%";
		where += " and (A.slug like :slug) ";
	}
	
	if((item.viewtype != "") && (item.viewtype != undefined)&& (item.viewtype != "novalue")){
		dataParams.viewtype = "%" + item.viewtype + "%";
		where += " and (A.viewtype like :viewtype) ";
	}
	if((item.status != "") && (item.status != undefined)&& (item.status != "novalue")){
		dataParams.status = "%" + item.status + "%";
		where += " and (A.status like :status) ";
	}
	
	if((item.description != "") && (item.description != undefined)){
		dataParams.description = "%" + item.description + "%";
		where += " and (A.description like :description) ";
	}
	let sql = ` SELECT A.id, A.parent_id , CParent.name as nameParent 
	, A.companies_id, A.name, A.slug, A.thumbnail, A.viewtype, A.link
	, A.is_show_homepage, A.ordering, A.description, A.status
	, A.user_id_created, A.user_name_created, A.datetime_created
	, A.user_id_modified, A.user_name_modified, A.datetime_modified 			
	FROM categories A  left join categories as CParent on A.parent_id = CParent.id   ${where} `;
	let result =  await dbConnection.executeQuery(sql, dataParams );
	return result;
}

async function getByIdFrontend(id){
	try{
	let dataParams = { 
		id,
		status:'Active'		
	};	
	let sql = ` SELECT A.* 	FROM categories A  where (A.id = :id ) and (A.status = :status) `;
	let result =  await dbConnection.executeQuery(sql, dataParams);	
	
	if(result.length>0)
		return result[0]
	return result;
	}
	catch(err){
		console.log(err);
	}
	return false;
	//return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, id);
}

async function listItemsFrontend () {
	try{
		let dataParams = { 			
			status:'Active'		
		};	
		let sql = ` SELECT  A.* FROM categories A  where (A.status = :status) 
		ORDER BY A.ordering LIMIT 200`;
		let result =  await dbConnection.executeQuery(sql, dataParams);	
		
		return result;
		}
		catch(err){
			console.log(err);
		}
		return false;
	}
//novalue
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
	getByIdFrontend,
	listItemsFrontend
};
