var express = require('express');
var router = express.Router();
var passport = require('passport');
const clean = require('xss-clean/lib/xss').clean;
var md5 = require('md5');

const StringHelpers = require(__path_helpers + 'string');
const systemConfig = require(__path_configs + 'system');
const UsersModel = require(__path_models + 'sys_users');
const MainControllers   = require(__path_controllers + 'sys_users');
const middleGetUserInfo = require(__path_middleware + 'get-user-info');
const publicFunction = require(__path_helpers + 'publicFunction');


const ValidateLogin = require(__path_validates + 'login');
const folderView = __path_views_blog + 'pages/auth/';
const folderViewSuccess = __path_views_backend + 'home/';
const layoutLogin = __path_views_blog + 'login';
const layoutBlog = __path_views_blog + 'frontend';
const layoutBackend = __path_views_backend + 'backend';

const linkIndex = StringHelpers.formatLink('/' + systemConfig.prefixAdmin + '/');
const linkLogin = StringHelpers.formatLink('/' + systemConfig.prefixAdmin + '/auth/login/');
const linkLoginSuccess = StringHelpers.formatLink('/' + systemConfig.prefixAdmin + '/auth/loginSuccess/');
const middlesetHeader = require(__path_middleware + 'setHeader');
const ParamsHelpers = require(__path_helpers + 'params');
var {protect, authorize}  = require(__path_middleware + 'auth');
var asyncHandler = require(__path_middleware + 'async');


/* GET logout page. */
router.get('/logout', middlesetHeader, function (req, res, next) {

	try{
		const options = {
			expirers : new Date (
				Date.now() + 10 * 1000
			),
			httpOnly : true,
			signed: true
		}		
		res.cookie('info', {}, options);
	}
	catch(err){		
		// console.error(err.message)
	}

	req.logout(function(err) {
		if (err) { return next(err); }
		//res.redirect('/');
		res.redirect(linkLogin);
	});
});

/* GET login page. */
router.get('/login/:resetPassword/token/:token', async function (req, res, next) {
	let languageString = await publicFunction.getLanguage("formLogin.ini");
	let token = ParamsHelpers.getParam(req.params, 'token', '');	
	let item = {
		Password: '',
		token: token,		
		resetPassword:true
	};
	let errors = null;
	res.render(`${folderView}login`, { layout: layoutLogin, errors, item, language:languageString });
});
/* GET login page. */
router.get('/login/:forgotPassword/token/:token', async function (req, res, next) {
	let languageString = await publicFunction.getLanguage("formLogin.ini");
	let token = ParamsHelpers.getParam(req.params, 'token', '');	
	let item = {
		Password: '',
		token: token,	
		resetPassword:true
	};
	let errors = null;
	res.render(`${folderView}login`, { 
		layout: layoutLogin, 
		errors, 
		item, 
		language:languageString
	});


});


/* GET login page. */
router.get('/login', async function (req, res, next) {
	try{
		if (req.isAuthenticated())
			res.redirect(linkIndex);  // If you are already logged in, go to the home page
		let item = {
			Password: '',
			token: '',
			resetPassword:false
		};
		let errors = null;
		let languageString = await publicFunction.getLanguage("formLogin.ini");
		res.render(`${folderView}login`, { 
			layout: layoutLogin, 
			errors, item,
			language:languageString
		});
	}
	catch(error){
		let errors = null;
		let languageString = await publicFunction.getLanguage("formLogin.ini");
		res.render(`${folderView}login`, { 
			layout: layoutLogin, 
			errors, item,
			language:languageString
		});
	}
});

/* GET login success page. */
router.get('/loginSuccess', middlesetHeader, async (req, res, next) => {
	if (req.isAuthenticated()) {
		let idUser = req.user.id;
		await UsersModel.getByIdCheckLogin(idUser).then(async(user) => {
			//	let user = arruser[0];	
			user.password = '';	// xóa passwword trước khi lưu cookie
			await UsersModel.getSignedJwtToken(user).then((token) => {	
				user['tokenLogin'] = token;                       
			});	
			// Xử lý thêm user này có quyền admin không? xử lý trong middleware / get-user-info
			res.cookie('info', user, { signed: true }); // ghi cookie  user
		});

		//res.send('hello world')

		res.render(`${folderViewSuccess}index`, {
			pageTitle: 'Home Page Admin',
			userLogin:req.user
		  });

	}
	else {
		let languageString = await publicFunction.getLanguage("formLogin.ini");		
		let item = { UserName: '', 'password': '' };
		let errors = null;
		res.render(`${folderView}login`, { 
			layout: layoutLogin, 
			errors, 
			item,
			language: languageString 
		});
	}
});

/* GET dashboard page. */
router.get('/no-permission', middlesetHeader, middleGetUserInfo, function (req, res, next) {
	res.render(`${folderView}no-permission`, { layout: layoutBlog, top_post: false });
});

router.get('/formChangePassword', middlesetHeader, middleGetUserInfo, async function async (req, res, next) {
	let languageString = await publicFunction.getLanguage("formChangePassword.ini");
	let item = { UserName: '', Password: '' };
	let errors = null;
	res.render(`${folderView}formChangePassword`, {
		pageTitle: "Change Password",
		layout: layoutBackend
		, errors
		, item
		,language: languageString
	});
});



router.put('/changePassword', protect, asyncHandler(MainControllers.changePassword));


router.put('/ForgotPassword', middlesetHeader, async function (req, res, next) {
	req.body = JSON.parse(JSON.stringify(req.body));
	let item = Object.assign(req.body); // chuyển cái form thành item
	let username = md5(item.Username);
	let url = req.protocol + "://" + req.get('host') + "/";	
	await UsersModel.forgotPassword(username, url).then(async (result) => {
		res.send({
			'result': result,
		});
	});
});

router.put('/resetNewPassword', middlesetHeader, async function (req, res, next) {
	req.body = JSON.parse(JSON.stringify(req.body));
	let item = Object.assign(req.body); 
	let url = req.protocol + "://" + req.get('host') + "/";
	let data = {
		password : md5(item.newPassword),
		passworConfirm : md5(item.confirmNewPassword),
		token_change_password : item.token
	}
	if (data.password == data.passworConfirm) {
		await UsersModel.userResetsPassword(data, url).then(async (result) => {
			res.send({
				'result': result,
			});
		});
	}
	else {
		res.send({
			'result': false,
		});
	}
});

/* POST login page. */
router.post('/login', middlesetHeader, function (req, res, next) { 
	if (req.isAuthenticated()) res.redirect(linkIndex);
	req.body = JSON.parse(JSON.stringify(req.body)); 
	ValidateLogin.validator(req);
	let item = Object.assign(req.body); 
	//item 		= clean(item);	
	item.username = md5(item.username);
	item.password = md5(item.password);	
	//console.log(item);
	let errors = false;//req.validationErrors();
	if (errors) {
		res.render(`${folderView}login`, { layout: layoutLogin, item, errors });
	} else {
		passport.authenticate('local', { // kiểm tra đăng nhập trong config.passport			
			successRedirect: linkLoginSuccess,
			//successRedirect: linkIndex,
			failureRedirect: linkLogin,
			failureFlash: true
		})(req, res, next)
	}
});


module.exports = router;
