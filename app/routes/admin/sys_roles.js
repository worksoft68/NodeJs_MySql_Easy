var express             = require('express');
var router              = express.Router();
const collection        = "sys_roles";
const MainControllers   = require(__path_controllers + collection);
const Sys_Role_PermissionControllers = require(__path_controllers + 'sys_role_permissions');

var asyncHandler        = require(__path_middleware + 'async');
var {protect, authorize}  = require(__path_middleware + 'auth');

router.get('(/)?', protect, authorize(collection,"getData"), asyncHandler(MainControllers.indexString));

router.get('(/searchGet)?', protect, authorize(collection,"getData"), asyncHandler(MainControllers.searchGet));

router.post('/save', protect, authorize(collection,"save"), asyncHandler(MainControllers.save));

router.put('/update', protect, authorize(collection,"save"), asyncHandler(MainControllers.update));

router.get('/getById/:id', protect, authorize(collection,"getData"), asyncHandler(MainControllers.getById));

router.post('/search', protect, authorize(collection,"getData"), asyncHandler(MainControllers.search));
router.post('/getAll', protect, authorize(collection,"getData"), asyncHandler(MainControllers.search));

router.delete('/deleteById', protect, authorize(collection,"delete"), asyncHandler(MainControllers.deleteById));

router.delete('/deleteList', protect, authorize(collection,"delete"), asyncHandler(MainControllers.deleteList));

router.post('/exportData', protect, authorize(collection,"getData"), asyncHandler(MainControllers.exportData));

router.post('/saveRolePermissions', protect, authorize(collection,"save"), asyncHandler(Sys_Role_PermissionControllers.save));

router.put('/updateRolePermission', protect, authorize(collection,"save"), asyncHandler(Sys_Role_PermissionControllers.update));

router.get('/getByIdRolePermission/:id', protect, authorize(collection,"getData"), asyncHandler(Sys_Role_PermissionControllers.getById));

router.delete('/deleteByIdRolePermission', protect, authorize(collection,"delete"), asyncHandler(Sys_Role_PermissionControllers.deleteById));

module.exports = router;
