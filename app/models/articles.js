var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mysql');
const FileHelpers	= require(__path_helpers + 'file');
const publicFunction	= require(__path_helpers + 'publicFunction');
const MainSchemas	 = require(__path_schemas + 'articles');
const LogModel = require(__path_models + 'systemlogs'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'articles';//use this parameter to check permissions: save, select, delete.... 
const uploadFolder = 'public/uploads/'+functionBranch+'/';

async function saveItem_(item, userLogin){ 
	
	let data = {
		categorie_id: item.categorie_id,
		title: item.title,
		slug: item.slug,
		thumb: item.thumb,
		summary: item.summary,
		content_articles: publicFunction.decodeSpecialCharacters(item.content_articles),
		ordering: item.ordering,
		is_special: item.is_special,
		status: item.status,
	}
	if(item.id == ''){
		data["company_id"]		= userLogin.company_id; 
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
		categorie_id: item.categorie_id,
		title: item.title,
		slug: item.slug,
		thumb: item.thumb,
		summary: item.summary,
		content_articles: publicFunction.decodeSpecialCharacters(item.content_articles),
		ordering: item.ordering,
		is_special: item.is_special,
		status: item.status,
	}
	data["company_id"]		= userLogin.company_id; 
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
		categorie_id: item.categorie_id,
		title: item.title,
		slug: item.slug,
		thumb: item.thumb,
		summary: item.summary,
		content_articles: publicFunction.decodeSpecialCharacters(item.content_articles),
		ordering: item.ordering,
		is_special: item.is_special,
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
	let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.thumb);
	if (rerultDeleteFile) {
		let dataParams = {
			id: id,
			company_id: userLogin.company_id
		};
		let sql = ` delete from ${MainSchemas.schemas.table} 
			where (id like :id) and (company_id like :company_id)
		`;
		return  await dbConnection.deleteObject(sql, dataParams);
//		return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,id);
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
				let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.thumb);
				if (rerultDeleteFile) {
					let dataParams = {
						id: listId[i],
						company_id: userLogin.company_id
					};
					let sql = ` delete from ${MainSchemas.schemas.table} 
						where (id like :id) and (company_id like :company_id) 
					`;
					resultOne =  await dbConnection.deleteObject(sql, dataParams);
//						resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, listId[i]);
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
	dataParams["company_id"] = userLogin.company_id;
	where += " and (A.company_id like :company_id) ";
	let sort = " A.id DESC ";
	if(options != null) {
		if((options.title != "") && (options.title != undefined)){
			dataParams.title = "%" + options.title + "%";
			where += " and (A.title like :title) ";
		}
		if((options.slug != "") && (options.slug != undefined)){
			dataParams.slug = "%" + options.slug + "%";
			where += " and (A.slug like :slug) ";
		}
		if((options.thumb != "") && (options.thumb != undefined)){
			dataParams.thumb = "%" + options.thumb + "%";
			where += " and (A.thumb like :thumb) ";
		}
		if((options.summary != "") && (options.summary != undefined)){
			dataParams.summary = "%" + options.summary + "%";
			where += " and (A.summary like :summary) ";
		}
		if((options.content_articles != "") && (options.content_articles != undefined)){
			dataParams.content_articles = "%" + options.content_articles + "%";
			where += " and (A.content_articles like :content_articles) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.id, A.categorie_id, B.name as categoryName, A.title, A.slug, A.thumb, A.summary, A.content_articles, A.ordering, A.is_special, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
	
			, COUNT(*) OVER() as TotalRecord
			FROM articles A inner join categories B on A.categorie_id = B.id    ${where}
			ORDER BY ${sort}
			LIMIT ${skip}, ${params.pagination.totalItemsPerPage}`;
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function getById( id, userLogin = null){
	let dataParams = { 
		id: id,
		company_id: userLogin.company_id
	};
	
	let sql = ` SELECT A.id, A.categorie_id, B.name as categoryName, A.title, A.slug, A.thumb, A.summary, A.content_articles, A.ordering, A.is_special, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified
				, A.count_view
				, A.count_like
				, A.count_dislike
				FROM articles A
				inner join categories B on A.categorie_id = B.id 
				where ( A.id = :id ) and (A.company_id like :company_id)`;
	let result=  await dbConnection.executeQuery(sql, dataParams);
	if(result.length>0)
		return result[0];
	else
		return result;	
}

async function listItemsFrontendSpecial() {
	let sql = ` SELECT A.id, A.categorie_id, B.name as categoryName, A.title, A.slug, A.thumb, A.summary, A.is_special, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
	FROM articles A inner join categories B on A.categorie_id = B.id 
	where A.status = 'Active'			
	ORDER BY A.ordering LIMIT 3
	`;
	let dataParams = { };	
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function getItemsByIdFrontend(id){
	let dataParams = { 
		id: id,
		status: 'Active'		
	};
	
	let sql = ` SELECT A.id, A.categorie_id , B.name as categoryName , A.title, A.slug,A.content_articles, A.thumb, A.summary, A.is_special, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
	FROM articles A inner join categories B on A.categorie_id = B.id 
	where (A.status = 'Active'	) and ( A.id = :id )
	`;	
	
	let result=  await dbConnection.executeQuery(sql, dataParams);
	if(result.length>0)
		return result[0];
	else
		return result;	
}
async function listItemsFrontendItemsNews() {
	let sql = ` SELECT A.id, A.categorie_id, B.name as categoryName, A.title, A.slug, A.thumb, A.summary, A.is_special, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
	FROM articles A inner join categories B on A.categorie_id = B.id 
	ORDER BY A.datetime_created desc LIMIT 3
	`;
	let dataParams = { };
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function listItemsFrontendItemsInCategory(categorie_id) {
	let dataParams = { 
		categorie_id
	};
	let sql = ` SELECT A.id, A.categorie_id , B.name as categoryName , A.title, A.slug, A.thumb, A.summary, A.is_special, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
	FROM articles A inner join categories B on A.categorie_id = B.id 
	where (A.status = 'Active'	) and (A.categorie_id like :categorie_id)		
	ORDER BY A.datetime_created desc LIMIT 10
	`;	
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function listItemsFrontendItemsOthers(id, categorie_id) {
	let sql = ` SELECT A.id, A.categorie_id, A.title, A.slug, A.thumb, A.summary, A.is_special, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
	FROM articles A 
	where (A.id != :id) and (A.categorie_id like :categorie_id) and (A.status = 'Active') 
	ORDER BY A.datetime_created desc LIMIT 3
	`;
	let dataParams = { 
		id,
		categorie_id
	};
	return result =  await dbConnection.executeQuery(sql, dataParams);
}
async function listItemsFrontendItemRandom() {
	let sql = ` SELECT A.id, A.categorie_id, A.title, A.slug, A.thumb, A.summary, A.is_special, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
	FROM articles A 
	where A.status = 'Active'			
	ORDER BY A.datetime_created desc LIMIT 3
	`;
	let dataParams = { };	
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function searchItemsFrontend(keyword) {
	let arrKeyword = keyword.split('-');
	let andQueryTitle = '';
	let andQuerySummary = '';
	let andQueryContent = '';
	for(let index=0; index < arrKeyword.length; index++)
	{
		if(arrKeyword[index] != "")
		{
			if(index == 0){
				andQueryTitle += ` (A.title like N'%${arrKeyword[index]}%')`;
				andQuerySummary += ` (A.summary like N'%${arrKeyword[index]}%')`;
				andQueryContent += ` (A.content_articles like N'%${arrKeyword[index]}%')`;
			}
			else{
				andQueryTitle += ` and (A.title like N'%${arrKeyword[index]}%')`;
				andQuerySummary += ` and (A.summary like N'%${arrKeyword[index]}%')`;
				andQueryContent += ` and (A.content_articles like N'%${arrKeyword[index]}%')`;
			}
			
		}
	}

	let sql = ` SELECT A.id, A.categorie_id, A.title, A.slug, A.thumb, A.summary, A.is_special, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
	FROM articles A 
	where (A.status = 'Active')	and ((${andQueryTitle})or(${andQuerySummary})or(${andQueryContent}))

	ORDER BY A.datetime_created desc LIMIT 20
	`;
	//console.log(sql);
	let dataParams = { };	
	return result =  await dbConnection.executeQuery(sql, dataParams);
}


async function exportData(item, userLogin){
	let dataParams = { };
	let where =" where (1) ";
	dataParams["company_id"] = userLogin.company_id;
	where += " and (A.company_id like :company_id) ";

	if((item.title != "") && (item.title != undefined)){
		dataParams.title = "%" + item.title + "%";
		where += " and (A.title like :title) ";
	}
	if((item.slug != "") && (item.slug != undefined)){
		dataParams.slug = "%" + item.slug + "%";
		where += " and (A.slug like :slug) ";
	}
	if((item.thumb != "") && (item.thumb != undefined)){
		dataParams.thumb = "%" + item.thumb + "%";
		where += " and (A.thumb like :thumb) ";
	}
	if((item.summary != "") && (item.summary != undefined)){
		dataParams.summary = "%" + item.summary + "%";
		where += " and (A.summary like :summary) ";
	}
	if((item.content_articles != "") && (item.content_articles != undefined)){
		dataParams.content_articles = "%" + item.content_articles + "%";
		where += " and (A.content_articles like :content_articles) ";
	}
	let sql = ` SELECT A.id, A.categorie_id, B.name as categoryName, A.title, A.slug, A.thumb, A.summary, A.content_articles, A.ordering, A.is_special, A.status, A.user_id_created, A.user_name_created, A.datetime_created, A.user_id_modified, A.user_name_modified, A.datetime_modified 
				, A.count_view
				, A.count_like
				, A.count_dislike
			 FROM articles A inner join categories B on A.categorie_id = B.id   ${where} `;
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
	exportData,
	listItemsFrontendSpecial,
	listItemsFrontendItemsNews,
	listItemsFrontendItemsInCategory,
	listItemsFrontendItemsOthers,
	listItemsFrontendItemRandom,
	getItemsByIdFrontend,
	searchItemsFrontend
};
