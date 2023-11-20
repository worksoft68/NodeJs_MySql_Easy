var express = require('express');
var router = express.Router();
const collection = "sys_User";
const MainControllers = require(__path_controllers + collection);
const sys_User_RoleControllers = require(__path_controllers + 'sys_User_Role');
var asyncHandler = require(__path_middleware + 'async');

router.post('(/register)?', asyncHandler(MainControllers.register));


module.exports = router;
