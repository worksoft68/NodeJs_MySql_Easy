const clean = require('xss-clean/lib/xss').clean;
const collection = "sys_role_permissions";//use this parameter to check permissions: save, select, delete.... 
const name_Cookie_Language = 'language_' + collection.toLowerCase();
const MainModel = require(__path_models + collection);
const {validate}  	= require(__path_validates + collection);
const {validateRequest}  	= require(__path_validates + 'validates');
const sys_function_for_permissionsModel = require(__path_models + 'sys_function_for_permissions');
const sys_rolesModel = require(__path_models + 'sys_roles');
const ParamsHelpers = require(__path_helpers + 'params');
const publicFunction = require(__path_helpers + 'publicFunction');
const pageTitleIndex = 'sys_role_permissions Management';
const folderView = __path_views_backend + collection + '/';

module.exports = {
	//indexString function is similar to the indexJson above, but the return data is string, not json
	indexString: async function(req, res, next) {
		let params 			= await ParamsHelpers.createParam(req);
		let languageString 	= JSON.stringify(await publicFunction.getLanguageRequest(req, name_Cookie_Language));
		const catalogue = [];
		sys_function_for_permissions = await sys_function_for_permissionsModel.listItemForDropdown();
		catalogue.push(sys_function_for_permissions);
		sys_roles = await sys_rolesModel.listItemForDropdown();
		catalogue.push(sys_roles);
		let catalogueString = JSON.stringify(catalogue);
		MainModel.listItems(params, req.user).then((items) => {
			if((!items) || (items.length < 1) || (items.status == 'error'))
				params.pagination.totalItems = 0;
			else params.pagination.totalItems = items[0].TotalRecord;
			let itemString = JSON.stringify(items);
			let paramsString = JSON.stringify(params);
			res.render(`${folderView}list`, {
				pageTitle: pageTitleIndex,
				itemString,
				item:{},
				params : paramsString,
				language: languageString,
				catalogue : catalogueString
			});
		});
	},

// end indexString =================================================================================================
	//indexJson function is similar to the indexString above, but the return data is json, not string
	indexJson: async function(req, res, next) {
		let params 		= await ParamsHelpers.createParam(req);
		let language 	= await publicFunction.getLanguageRequest(req, name_Cookie_Language);
		const catalogue = [];
		sys_function_for_permissions = await sys_function_for_permissionsModel.listItemForDropdown();
		catalogue.push(sys_function_for_permissions);
		sys_roles = await sys_rolesModel.listItemForDropdown();
		catalogue.push(sys_roles);
		MainModel.listItems(params, req.user).then((data) => {
			if((!data) || (data.length < 1)){
				params.pagination.totalItems = 0;
				return res.status(200).json({
					success : true,
					pageTitle: pageTitleIndex,
					data: "Empty data",
					params,
					language,
					catalogue,
				});
			}
			else{
				params.pagination["totalItems"] = data[0].TotalRecord;
				return res.status(200).json({
					success : true,
					pageTitle: pageTitleIndex,
					data,
					params,
					language,
					catalogue
				});
			}
		});
	},

// end indexJson =================================================================================================
// Post params get data, This function is similar to the Search function
	getAll: async function(req, res, next) {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		let params = await ParamsHelpers.createPagination(item);
		await MainModel.listItems(params, req.user, item).then((data) => {
			if((!data) || (data.length < 1)) {
				params.pagination["totalItems"] = 0;
				return res.status(200).json({
					success : true,
					data: "Empty data",
					params,
				});
			}
			else {
				params.pagination["totalItems"] = data[0].TotalRecord;
				return res.status(200).json({
					success : true,
					data,
					params,
				});
			}
		});
	},
// // end getAll ================================================================================================= =================================================================================================

	searchGet: async function(req, res, next){
		let params 			= await ParamsHelpers.createParam(req);
		let languageString 	= JSON.stringify(await publicFunction.getLanguageRequest(req, name_Cookie_Language));
		const catalogue = [];
		sys_function_for_permissions = await sys_function_for_permissionsModel.listItemForDropdown();
		catalogue.push(sys_function_for_permissions);
		sys_roles = await sys_rolesModel.listItemForDropdown();
		catalogue.push(sys_roles);
		let catalogueString = JSON.stringify(catalogue);
		let item = {
			functions : await ParamsHelpers.getParam(req.query, 'functions', ''),
		};
		item = clean(item);
		MainModel.listItems(params, req.user, item).then((items) => {
			if(items.length>0)
				params.pagination.totalItems = items[0].TotalRecord;
			else params.pagination.totalItems = 0;
			let itemString = JSON.stringify(items);
			let paramsString = JSON.stringify(params);
			res.render(`${folderView}list`, {
				pageTitle: pageTitleIndex,
				itemString,
				item,
				params : paramsString,
				language: languageString,
				catalogue : catalogueString,
			});
		});
	},

// end searchGet =================================================================================================

	searchGetJson: async function(req, res, next){
		let params 		= await ParamsHelpers.createParam(req);
		let language 	= await publicFunction.getLanguageRequest(req, name_Cookie_Language);
		const catalogue = [];
		sys_function_for_permissions = await sys_function_for_permissionsModel.listItemForDropdown();
		catalogue.push(sys_function_for_permissions);
		sys_roles = await sys_rolesModel.listItemForDropdown();
		catalogue.push(sys_roles);
		let item = {
			functions : await ParamsHelpers.getParam(req.query, 'functions', ''),
		};
		item = clean(item);
		MainModel.listItems(params, req.user, item).then((items) => {
			if((!items) || (items.length < 1)){
				params.pagination.totalItems = 0;
				items = "Empty data";
			}
			else {
				params.pagination.totalItems = items[0].TotalRecord;
			}
			res.render(`${folderView}list`, {
				pageTitle: pageTitleIndex,
				items,
				params,
				language,
				catalogue,
			});
		});
	},

// end searchGet =================================================================================================

	save: async function(req, res, next) {
		let error = await validateRequest.validateReq(req,res, name_Cookie_Language,validate.options);
		if(error){
			return res.status(400).json({status:400, success : true, error : error});
		}
		else{
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			item = clean(item);

			let checkAlreadyExists = await MainModel.checkAlreadyExists(item,"Insert");
			if(checkAlreadyExists == false){
				await MainModel.saveInsert(item, req.user).then((data) => {
					res.status(data.status).send({status:data.status, success : data.success, data})	
				});
			}
			else{
				res.status(200).send({status:200, success : false, item, message:"FunctionAlreadyExists"})	
			}
			
		}
	},
// end save =================================================================================================

	update: async function(req, res, next){
		let error = await validateRequest.validateReq(req,res, name_Cookie_Language,validate.options);
		if(error){
			return res.status(400).json({status:400, success : true, error : error});
		}
		else{
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			item = clean(item);
			let checkAlreadyExists = await MainModel.checkAlreadyExists(item,"Update");
			if(checkAlreadyExists == false){
				await MainModel.saveUpdate(item, req.user).then((data) => {
					return res.status(data.status).json({status: data.status, success : data.success, data})
				});
			}
			else{
				res.status(200).send({status:200, success : false, item, message:"FunctionAlreadyExists"})	
			}
			
		}
	},
// end update =================================================================================================

	getById: async function(req, res, next){
		let id = ParamsHelpers.getParam(req.params, 'id', ''); 
		await MainModel.getById(id, req.user ).then((data) => {
			if(data){
				res.status(200).json({
					"success" : true,
					data
				});
			}
			else{
				res.status(200).json({
					"success"	: true,
					data: "Empty data"
				});
			}
		});
	},
// end getById =================================================================================================
	search: async function(req, res, next) {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		let params = await ParamsHelpers.createPagination(item);
		await MainModel.listItems(params, req.user, item).then((data) => {
			if((!data) || (data.length < 1)) {
				params.pagination["totalItems"] = 0;
				res.status(200).json({
					success : true,	
					data: "Empty data",
					params,
				});
			}
			else {
				params.pagination["totalItems"] = data[0].TotalRecord;
				res.status(200).json({
					success : true,	
					data,
					params,
				});
			}
		});
	},
// end search =================================================================================================

deleteById: async function(req, res, next) {
	try{
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.deleteById(item.id, req.user).then((result) => {
			res.status(200).json({
				'success': result
			});
		});
	}
	catch(err){
		console.log(err);
		res.status(200).json({
			'success': false
		});
	}
	},
// end deleteById =================================================================================================

	deleteList: async function(req, res, next) {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.deleteList(item, req.user).then((data) => {
			res.status(200).json({
				data
			});
		});
	},
// end deleteList =================================================================================================

	exportData: async function(req, res, next) {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.exportData(item, req.user).then((data) => {
			return res.status(200).json({
				success : true,
				data
			});
		});
	},
// end exportData =================================================================================================
};

