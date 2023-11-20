//**************************************************************************************************************************
//   This file cannot be used directly. You copy and paste this source to where you need it if needed 
//**************************************************************************************************************************

var express             = require('express');
var router              = express.Router();
var asyncHandler        = require(__path_middleware + 'async');

//**************************************************************************************************************************

const sys_role_permissionsControllers = require(__path_controllers + 'sys_role_permissions');

router.post('/savesys_role_permissions', asyncHandler(sys_role_permissionsControllers.save));

router.put('/updatesys_role_permissions', asyncHandler(sys_role_permissionsControllers.update));

router.get('/getByIdsys_role_permissions/:id', asyncHandler(sys_role_permissionsControllers.getById));

router.delete('/deleteByIdsys_role_permissions', asyncHandler(sys_role_permissionsControllers.deleteById));

module.exports = router;
