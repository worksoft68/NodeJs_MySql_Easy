//**************************************************************************************************************************
//   This file cannot be used directly. You copy and paste this source to where you need it if needed 
//**************************************************************************************************************************

var express             = require('express');
var router              = express.Router();
var asyncHandler        = require(__path_middleware + 'async');

//**************************************************************************************************************************

const categoriesControllers = require(__path_controllers + 'categories');

router.post('/savecategories', asyncHandler(categoriesControllers.save));

router.put('/updatecategories', asyncHandler(categoriesControllers.update));

router.get('/getByIdcategories/:id', asyncHandler(categoriesControllers.getById));

router.delete('/deleteByIdcategories', asyncHandler(categoriesControllers.deleteById));

module.exports = router;
