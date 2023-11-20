const clean = require('xss-clean/lib/xss').clean;
const collection = "articles";//use this parameter to check permissions: save, select, delete.... 
const name_Cookie_Language = 'language_' + collection.toLowerCase();
const MainModel = require(__path_models + collection);
const {validate}  	= require(__path_validates + collection);
const {validateRequest}  	= require(__path_validates + 'validates');
const MainValidate  = require(__path_validates + collection);
const categoriesModel = require(__path_models + 'categories');
const ParamsHelpers = require(__path_helpers + 'params');
const publicFunction = require(__path_helpers + 'publicFunction');
const systemConfig = require(__path_configs + 'system');
const linkIndex = systemConfig.prefixAdmin + '/' + collection + '/';
const NotifyHelpers = require(__path_helpers + 'notify');
const FileHelpers = require(__path_helpers + 'file');
const uploadFile = FileHelpers.upload('thumb', collection);// thumb: control file name in HTML. articles is folder in folder public 
const uploadFolder = 'public/uploads/' + collection + '/';
const pageTitleIndex = 'Articles List Management';
const folderView = __path_views_backend + collection + '/';

module.exports = {
	//indexString function is similar to the indexJson above, but the return data is string, not json
	indexString: async function(req, res, next) {
		let params 			= await ParamsHelpers.createParam(req);
		let languageString 	= JSON.stringify(await publicFunction.getLanguageRequest(req, name_Cookie_Language));
		const catalogue = [];
		categories = await categoriesModel.listItemForDropdown(req.user);
		catalogue.push(categories);
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
		categories = await categoriesModel.listItemForDropdown(req.user);
		catalogue.push(categories);
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
		categories = await categoriesModel.listItemForDropdown();
		catalogue.push(categories);
		let catalogueString = JSON.stringify(catalogue);
		let item = {
			title : await ParamsHelpers.getParam(req.query, 'title', ''),
			slug : await ParamsHelpers.getParam(req.query, 'slug', ''),
			thumb : await ParamsHelpers.getParam(req.query, 'thumb', ''),
			summary : await ParamsHelpers.getParam(req.query, 'summary', ''),
			content_articles : await ParamsHelpers.getParam(req.query, 'content_articles', ''),
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
		categories = await categoriesModel.listItemForDropdown();
		catalogue.push(categories);
		let item = {
			title : await ParamsHelpers.getParam(req.query, 'title', ''),
			slug : await ParamsHelpers.getParam(req.query, 'slug', ''),
			thumb : await ParamsHelpers.getParam(req.query, 'thumb', ''),
			summary : await ParamsHelpers.getParam(req.query, 'summary', ''),
			content_articles : await ParamsHelpers.getParam(req.query, 'content_articles', ''),
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
		let userLogin	= publicFunction.getUserLogin(req, res);
		let language 	= await publicFunction.getLanguageRequest(req, name_Cookie_Language);
		let notify = {classnotify:'success'};
		uploadFile(req, res, async (errUpload) => {
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			item = clean(item);
			if ((item.is_special == 'on') || (item.is_special == 'yes') || (item.is_special == 'true') || (item.is_special == '1'))
				item.is_special = 1;
			else item.is_special = 0;
			let taskCurrent = (typeof item !== "undefined" && item.id != "") ? "edit" : "add";
			let errors = await validate.validateSave(item, language);
			if (errors != false) {
				if (req.file != undefined)
					FileHelpers.remove(uploadFolder, req.file.filename); // delete the picture when the form is not valid
				let params = await ParamsHelpers.createParam(req);
				let languageString = JSON.stringify(language);
				await MainModel.listItems(params, req.user).then(async (items) => {
					if (items.length > 0)
						params.pagination.totalItems = items[0].TotalRecord;
					else params.pagination.totalItems = 0;
					let itemString = JSON.stringify(items);
					let paramsString = JSON.stringify(params);
					res.render(`${folderView}list`, {
						pageTitle: pageTitleIndex,
						itemString,
						item: {},
						params: paramsString,
						language: languageString,
					});
				});
			}
			else {
				if (req.file == undefined) { // do not post files
					item.thumb = item.thumb_old;
				} else {
					item.thumb = req.file.filename;
					if (taskCurrent == "edit")
						FileHelpers.remove(uploadFolder, item.thumb_old);
				}
				if(item.id == "") {
					await MainModel.saveInsert(item, req.user).then((data) => {
						if (data === 'false') task = taskCurrent + '-' + data;
						NotifyHelpers.show(req, res, 'back', { task: taskCurrent });
					});
				}
				else {
					await MainModel.saveUpdate(item, req.user).then((data) => {
						if (data === 'false') task = taskCurrent + '-' + data;
						NotifyHelpers.show(req, res, 'back', { task: taskCurrent });
					});
				}
			}
		});
	},


	update: async function(req, res, next){
		let language 	= await publicFunction.getLanguageRequest(req, name_Cookie_Language);
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		if ((item.is_special == 'on') || (item.is_special == 'yes') || (item.is_special == 'true') || (item.is_special == '1'))
			item.is_special = 1;
		else item.is_special = 0;

		let errors = await validate.validateSave(item, language);
		if (errors != false) {
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			item = clean(item);
			await MainModel.saveUpdate(item, req.user).then((data) => {
				return res.status(data.status).json({status: data.status, success : data.success, data})
			});
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


