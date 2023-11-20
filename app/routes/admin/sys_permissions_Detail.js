//**************************************************************************************************************************
//   This file cannot be used directly. You copy and paste this source to where you need it if needed 
//**************************************************************************************************************************

var express             = require('express');
var router              = express.Router();
var asyncHandler        = require(__path_middleware + 'async');

//**************************************************************************************************************************

const sys_permissionsControllers = require(__path_controllers + 'sys_permissions');

router.post('/savesys_permissions', asyncHandler(sys_permissionsControllers.save));

router.put('/updatesys_permissions', asyncHandler(sys_permissionsControllers.update));

router.get('/getByIdsys_permissions/:id', asyncHandler(sys_permissionsControllers.getById));

router.delete('/deleteByIdsys_permissions', asyncHandler(sys_permissionsControllers.deleteById));

module.exports = router;
