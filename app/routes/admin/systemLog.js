var express = require('express');
var router = express.Router();
const clean = require('xss-clean/lib/xss').clean;
const collection = "systemLog";
const systemConfig = require(__path_configs + 'system');
const MainModel = require(__path_models + collection);
const MainValidate = require(__path_validates + collection);
const QuyenHeThongModel = require(__path_models + 'quyenhethong');
const ParamsHelpers = require(__path_helpers + 'params');
const publicFunction = require(__path_helpers + 'publicFunction');
const linkIndex = systemConfig.prefixAdmin + '/' + collection + '/';
const pageTitleIndex = 'SystemLog Management';
const folderView = __path_views_backend + collection + '/';
const middlesetHeader = require(__path_middleware + 'setHeader');

router.get('(/)?', async (req, res, next) => {
	let userLogin = publicFunction.getUserLogin(req, res);
	QuyenHeThongModel.kiemTraQuyenTuyCap(userLogin.UsersId, collection, res)
	let params = await ParamsHelpers.createParam(req);
	let languageString = await publicFunction.getLanguage(collection + ".ini");
	MainModel.listItems(params, userLogin).then((items) => {
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
});


router.get('(/)?', async (req, res, next) => {
	let userLogin = publicFunction.getUserLogin(req, res);
	QuyenHeThongModel.kiemTraQuyenTuyCap(userLogin.UsersId, collection, res)
	let params = await ParamsHelpers.createParam(req);
	let languageString = await publicFunction.getLanguage(collection + ".ini");
	let item = {
		Action: await ParamsHelpers.getParam(req.query, 'Action', ''),
		ImpactZone: await ParamsHelpers.getParam(req.query, 'ImpactZone', ''),
		IdTable: await ParamsHelpers.getParam(req.query, 'IdTable', ''),
		ContentLog: await ParamsHelpers.getParam(req.query, 'ContentLog', ''),
		ContentLogMax: await ParamsHelpers.getParam(req.query, 'ContentLogMax', ''),
		IP: await ParamsHelpers.getParam(req.query, 'IP', ''),
		MacAddress: await ParamsHelpers.getParam(req.query, 'MacAddress', ''),
		HostName: await ParamsHelpers.getParam(req.query, 'HostName', ''),
		FullName: await ParamsHelpers.getParam(req.query, 'FullName', ''),
	};
	item = clean(item);
	MainModel.search(params, userLogin, item).then((items) => {
		if (items.length > 0)
			params.pagination.totalItems = items[0].TotalRecord;
		else params.pagination.totalItems = 0;
		let itemString = JSON.stringify(items);
		let paramsString = JSON.stringify(params);
		res.render(`${folderView}list`, {
			pageTitle: pageTitleIndex,
			itemString,
			item,
			params: paramsString,
			language: languageString,
		});
	});
});


router.post('/save', middlesetHeader, async (req, res, next) => {
	let err = await validateReq(req, res, next);
	if (!err) {
		let userLogin = publicFunction.getUserLogin(req, res);
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.saveInsert(item, userLogin).then((result) => {
			res.status(result.status).send({ status: result.status, success: result.success, data: result })
		});
	}
});

router.put('/update', middlesetHeader, async (req, res, next) => {
	let err = await validateReq(req, res, next);
	if (!err) {
		let userLogin = publicFunction.getUserLogin(req, res);
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.saveUpdate(item, userLogin).then((result) => {
			return res.status(result.status).json({ status: result.status, success: result.success, data: result })
		});
	}
});
router.post('/search', middlesetHeader, async (req, res, next) => {
	let userLogin = publicFunction.getUserLogin(req, res);
	req.body = JSON.parse(JSON.stringify(req.body));
	let item = Object.assign(req.body);
	item = clean(item);
	let params = await ParamsHelpers.createPagination(item);
	await MainModel.search(params, userLogin, item).then((result) => {
		if (result.length > 0) params.pagination["totalItems"] = result[0].TotalRecord;
		else params.pagination["totalItems"] = 0;
		res.send({
			result,
			params,
			item
		});
	});
});

router.post('/exportData', middlesetHeader, async (req, res, next) => {
	let userLogin = publicFunction.getUserLogin(req, res);
	req.body = JSON.parse(JSON.stringify(req.body));
	let item = Object.assign(req.body);
	item = clean(item);
	await MainModel.exportData(item, userLogin).then((result) => {
		res.send({
			result
		});
	});
});

router.delete('/deletebyid', middlesetHeader, async (req, res, next) => {
	let userLogin = publicFunction.getUserLogin(req, res);
	req.body = JSON.parse(JSON.stringify(req.body));
	let item = Object.assign(req.body);
	item = clean(item);
	await MainModel.deleteById(item.Id, userLogin).then((result) => {
		res.send({
			'success': result
		});
	});
});

router.delete('/deletelist', middlesetHeader, async (req, res, next) => {
	let userLogin = publicFunction.getUserLogin(req, res);
	req.body = JSON.parse(JSON.stringify(req.body));
	let item = Object.assign(req.body);
	item = clean(item);
	await MainModel.deleteList(item, userLogin).then((result) => {
		res.send({
			result
		});
	});
});

router.get('/getById/:id', middlesetHeader, async (req, res, next) => {
	let userLogin = publicFunction.getUserLogin(req, res);
	let id = ParamsHelpers.getParam(req.params, 'id', '');
	await MainModel.getById(id, userLogin).then((result) => {
		res.send({
			'success': true,
			'data': result
		});
	});
});
module.exports = router;

const validateReq = async (req, res, next) => {
	let err = await MainValidate.validator(req);
	if (Object.keys(err).length > 0) {
		return res.status(400).json({ status: 400, success: true, error: err })
	}
	return false;
}
