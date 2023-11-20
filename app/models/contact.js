//**************************************************************************************************************************
//     Creation time: Saturday, 04 November 2023 4:24 PM
//     Creator: 
//**************************************************************************************************************************
var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mysql');
const sendEmail 			= require(__path_helpers + 'sendEmail');
const MainSchemas	 = require(__path_schemas + 'contact');
const LogModel = require(__path_models + 'systemlogs'); 
const systemConfig = require(__path_configs + 'system');

async function saveInsert(item, userLogin){ 
	let data = {
		fullname: item.fullname,
		email: item.email,
		phone: item.phone,
		content_message: item.content_message,
	}
	let result = await dbConnection.addAnything(MainSchemas.schemas, data);
	sendEmailContact(data);
	let status = 406;
	let success = false;
	if(result){
		if(result[0].affectedRows){
			data["id"] = result[0].insertId;
			status	= 201;
			success	= true;
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

async function sendEmailContact(data){
	var date 				= new Date();
	let email = systemConfig.Email;
		let idEmail 		= " Id " + date.getDay().toString() + date.getMonth().toString() + date.getFullYear().toString() + date.getHours().toString() + date.getMinutes().toString()+ date.getSeconds().toString()+ date.getMilliseconds().toString();
		let subject 		= " Contact letter " + data.fullname;
		
		let Body 			= " + Fullname: " + data.fullname;		
		Body += "<br /> + Email: " + data.email;
		Body += "<br /> + Phone: " + data.phone;
		Body += "<br /> + Content Message: " + data.content_message;
		Body += "<br /><br />" +idEmail;
		
		let ThamSoGuiEmail = {
			email 	: email,
			subject	: subject,
			message	: Body
		}
		let resultEmail = await sendEmail.sendEmailMicrosoft(ThamSoGuiEmail);

	return true;
}

async function saveUpdate(item, userLogin){ 
	let data = {
		fullname: item.fullname,
		email: item.email,
		phone: item.phone,
		content_message: item.content_message,
		done_processing: item.done_processing,
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

async function deleteById(id, userLogin = null){
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, id);
	await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.id, item_Old, userLogin);
	let dataParams = {
		id: id
	};
	let sql = ` delete from contact 
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
				let sql = ` delete from contact 
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
		if((options.fullname != "") && (options.fullname != undefined)){
			dataParams.fullname = "%" + options.fullname + "%";
			where += " and (A.fullname like :fullname) ";
		}
		if((options.email != "") && (options.email != undefined)){
			dataParams.email = "%" + options.email + "%";
			where += " and (A.email like :email) ";
		}
		if((options.phone != "") && (options.phone != undefined)){
			dataParams.phone = "%" + options.phone + "%";
			where += " and (A.phone like :phone) ";
		}
		if((options.content_message != "") && (options.content_message != undefined)){
			dataParams.content_message = "%" + options.content_message + "%";
			where += " and (A.content_message like :content_message) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.id, A.fullname, A.email, A.phone, A.content_message, A.done_processing 
			, COUNT(*) OVER() as TotalRecord
			FROM contact A    ${where}
			ORDER BY ${sort}
			LIMIT ${skip}, ${params.pagination.totalItemsPerPage}`;
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function getById( id, userLogin = null){
	let dataParams = {
		id : id,
	};
	//return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, id);
	let sql = ` SELECT A.id, A.fullname, A.email, A.phone, A.content_message, 
		A.done_processing 
		FROM contact as A
		where (A.id = :id) `; 
	return await  await dbConnection.selectOne(sql, dataParams );
}


async function listItemForDropdown(){
	 let sql = ` SELECT id, fullname, email, phone, content_message
			FROM contact  `;
	return  await dbConnection.executeQuery(sql); 
}

async function exportData(options, userLogin){
	let dataParams = { };
	let where =" where (1) ";
		if((options.fullname != "") && (options.fullname != undefined)){
			dataParams.fullname = "%" + options.fullname + "%";
			where += " and (A.fullname like :fullname) ";
		}
		if((options.email != "") && (options.email != undefined)){
			dataParams.email = "%" + options.email + "%";
			where += " and (A.email like :email) ";
		}
		if((options.phone != "") && (options.phone != undefined)){
			dataParams.phone = "%" + options.phone + "%";
			where += " and (A.phone like :phone) ";
		}
		if((options.content_message != "") && (options.content_message != undefined)){
			dataParams.content_message = "%" + options.content_message + "%";
			where += " and (A.content_message like :content_message) ";
		}
	let sql = ` SELECT A.id, A.fullname, A.email, A.phone, A.content_message, A.done_processing 
			 FROM contact A   ${where} 
			 order by id desc
			 `;
	let result =  await dbConnection.executeQuery(sql, dataParams );
	return result;
}

module.exports = {	
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
