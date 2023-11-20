var express = require('express');
var router = express.Router();
const systemConfig = require(__path_configs + 'system');
const ContractsModel = require(__path_models + 'contracts');


// router.delete('/delete', middlesetHeader,async (req, res, next) => {
// 	let userLogin	= publicFunction.getUserLogin(req, res);	
// 	req.body 		= JSON.parse(JSON.stringify(req.body));
// 	let item 		= Object.assign(req.body);
// 		item 		= clean(item);
// 		console.log(item);
// 	await MainModel.deleteItem(item.id, userLogin).then((result) => {	
// 		res.send({
// 			'success': result
// 		});
// 	});
// 	res.send({
// 		'success': 'false'
// 	});
// });



/* GET home page. */
router.get('/', async function (req, res, next) {

  //  let result = await  ContractsModel.addNew('123');
  //  console.log('router: '+ result);

  //  let resultDelete = await  ContractsModel.deleteItem(10);
  //  console.log('resultDelete');
  //  console.log(resultDelete);

  let resultProcedure = await ContractsModel.Getlist_SqlParamSchema(10);

  // let resultSqlParam2 = await  ContractsModel.Getlist_SqlParam2(10);
  //  console.log(resultSqlParam2);

  //  let resultSelectAnyByPrimaryKey = await  ContractsModel.SelectByPrimaryKey(10);
  // console.log(resultSelectAnyByPrimaryKey);

  // let resultexecuteQuerySchemaParam = await  ContractsModel.executeQuerySchemaParam(10);
  // console.log(resultexecuteQuerySchemaParam);



  //let result1 = await NhanVienModel.update();


  res.send('test 123');

});

module.exports = router;
