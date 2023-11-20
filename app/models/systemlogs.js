//**************************************************************************************************************************
//     Creation time: Wednesday, 25 October 2023 11:14 AM
//     Creator: 
//**************************************************************************************************************************
var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mysql');
const MainSchemas	 = require(__path_schemas + 'systemlogs');
const systemConfig = require(__path_configs + 'system');

async function saveLog(action_user, impact_zone, id_table, content_log, userLogin) {
	id_table = String(id_table);
	let strContentLog = JSON.stringify(content_log);
	let strContentLogMin = "";
	if (strContentLog.length > 1800) {
		strContentLogMin = strContentLog.substring(0, 1800);
	}
	else strContentLogMin = strContentLog;

	//console.log(strContentLogMin);
	if (impact_zone.length > 55) {
		impact_zone = impact_zone.substring(0, 55);
	}

	if (id_table.length > 24) {
		id_table = id_table.substring(0, 24);
	}

	let fullname = userLogin.firstname + ' ' + userLogin.lastname;
	if (fullname.length > 37) {
		fullname = fullname.substring(0, 37);
	}
	
	let data = {
		action_user: action_user,
		impact_zone: impact_zone,
		id_table: id_table,
		content_log: strContentLogMin,
		contentlog_max: strContentLog,		
		id_user: userLogin.id,
		fullname: fullname,
		datetime_log: moment(Date.now()).format(systemConfig.format_time_sql_system),
	};
	//console.log(data);
	let result = await dbConnection.addAnything(MainSchemas.schemas, data);


}


async function deleteById(id, userLogin = null){	
	let dataParams = {
		id: id
	};
	let sql = ` delete from systemlogs 
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
				let dataParams = {
					id: listId[i]
				};
				let sql = ` delete from systemlogs 
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
		if((options.action_user != "") && (options.action_user != undefined)){
			dataParams.action_user = "%" + options.action_user + "%";
			where += " and (A.action_user like :action_user) ";
		}
		if((options.impact_zone != "") && (options.impact_zone != undefined)){
			dataParams.impact_zone = "%" + options.impact_zone + "%";
			where += " and (A.impact_zone like :impact_zone) ";
		}
		if((options.id_table != "") && (options.id_table != undefined)){
			dataParams.id_table = "%" + options.id_table + "%";
			where += " and (A.id_table like :id_table) ";
		}
		if((options.content_log != "") && (options.content_log != undefined)){
			dataParams.content_log = "%" + options.content_log + "%";
			where += " and (A.content_log like :content_log) ";
		}
		if((options.contentlog_max != "") && (options.contentlog_max != undefined)){
			dataParams.contentlog_max = "%" + options.contentlog_max + "%";
			where += " and (A.contentlog_max like :contentlog_max) ";
		}
		
		if((options.fullname != "") && (options.fullname != undefined)){
			dataParams.fullname = "%" + options.fullname + "%";
			where += " and (A.fullname like :fullname) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.id, A.action_user, A.impact_zone, A.id_table, LEFT(A.content_log, 300) as content_log, A.ip, A.mac_address, A.hostname, A.id_user, A.fullname, A.datetime_log 
			, COUNT(*) OVER() as TotalRecord
			FROM systemlogs A    ${where}
			ORDER BY ${sort}
			LIMIT ${skip}, ${params.pagination.totalItemsPerPage}`;
	return result =  await dbConnection.executeQuery(sql, dataParams);
}

async function getById( id, userLogin = null){
	let dataParams = {
		id : id,
	};
	//return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, id);
	let sql = ` SELECT A.id, A.action_user, A.impact_zone, A.id_table 
		, A.id_user, A.fullname, 
		A.datetime_log 
		FROM systemlogs as A
		where (A.id = :id) `; 
	return await  await dbConnection.selectOne(sql, dataParams );
}




async function exportData(options, userLogin){
	let dataParams = { };
	let where =" where (1) ";
		if((options.action_user != "") && (options.action_user != undefined)){
			dataParams.action_user = "%" + options.action_user + "%";
			where += " and (A.action_user like :action_user) ";
		}
		if((options.impact_zone != "") && (options.impact_zone != undefined)){
			dataParams.impact_zone = "%" + options.impact_zone + "%";
			where += " and (A.impact_zone like :impact_zone) ";
		}
		if((options.id_table != "") && (options.id_table != undefined)){
			dataParams.id_table = "%" + options.id_table + "%";
			where += " and (A.id_table like :id_table) ";
		}
		if((options.content_log != "") && (options.content_log != undefined)){
			dataParams.content_log = "%" + options.content_log + "%";
			where += " and (A.content_log like :content_log) ";
		}
		if((options.contentlog_max != "") && (options.contentlog_max != undefined)){
			dataParams.contentlog_max = "%" + options.contentlog_max + "%";
			where += " and (A.contentlog_max like :contentlog_max) ";
		}
		
		if((options.fullname != "") && (options.fullname != undefined)){
			dataParams.fullname = "%" + options.fullname + "%";
			where += " and (A.fullname like :fullname) ";
		}
	let sql = ` SELECT A.id, A.action_user, A.impact_zone, A.id_table, A.content_log, A.contentlog_max, A.id_user, A.fullname, A.datetime_log 
			 FROM systemlogs A   ${where} `;
	let result =  await dbConnection.executeQuery(sql, dataParams );
	return result;
}

module.exports = {
	saveLog,
	deleteById,
	deleteList,
	listItems,	
	getById,	
	exportData,
};
