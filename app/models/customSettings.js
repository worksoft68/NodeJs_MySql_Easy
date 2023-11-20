const MainModel 	= require(__path_schemas + 'customSettings');
const publicFunction = require(__path_helpers + 'publicFunction');
module.exports = {
    listItems: (params, options = null) => {
        let objWhere    = {};
        let sort		= {};
        if(params.currentStatus !== 'all') objWhere.status = params.currentStatus;
        if(params.keyword !== '') objWhere.key = new RegExp(params.keyword, 'i');
        
        sort[params.sortField]  = params.sortType;
    
        return MainModel
            .find(objWhere)
            .select()
            .sort(sort)
            .skip((params.pagination.currentPage-1) * params.pagination.totalItemsPerPage)
            .limit(params.pagination.totalItemsPerPage);
    },

    listItemsFrontend: () =>{
        return MainModel
            .find({$and:[{status:'active'}]})
            .select('key value');   
    },


    getItem: (id, options = null) => {
        return MainModel.findById(id);
    },


    // getValueByKey: async (key) => {
    //     await module.exports.getItemByKey(key).then((item) =>{
    //         let data = item;           
    //         let value = data[0].value;
    //         if(value % 1 !== 0){
    //            return 5;
    //          }
    //          let a =  parseInt(value); 
    //         return a;
    //     });
    // },



    getItemByKey: async(key1, key2) => {        
        return await MainModel.find({$or:[{'key': key1},{'key': key2}]}); 
    },

    countItem: (params, options = null) => {
        let objWhere    = {};
        
        if(params.currentStatus !== 'all') objWhere.status = params.currentStatus;
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');
        return MainModel.countDocuments(objWhere);
    },

    changeStatus: (id, currentStatus, userLogin, options = null) => {
        let status			= (currentStatus === "active") ? "inactive" : "active";
        let data 			= {
            status: status,
            modified: {
                user_id: userLogin._id,
                user_name: userLogin.name,
                time: Date.now()
            }
        }

        if(options.task == "update-one"){
            return MainModel.updateOne({_id: id}, data);
        }

        if(options.task == "update-multi"){
            data.status = currentStatus;
            return MainModel.updateMany({_id: {$in: id }}, data);
        }
    },

    changeOrderingAjax: (id, orderings, userLogin) => { 
        // viết kiểu này thì bên ngoài mới dùng được theo kiểu
        //let result = await MainModel.changeOrderingAjax(id, orderings, userLogin);	
        return MainModel.updateOne({_id: id}, {
            ordering: parseInt(orderings),
            modified: {
                user_id: userLogin._id,
                user_name: userLogin.name,
                time: Date.now()
            }
        });
    },

    changeOrdering: async (cids, orderings, userLogin, options = null) => {
        let data = {
            ordering: parseInt(orderings), 
            modified:{
                user_id: userLogin._id,
                user_name: userLogin.name,
                time: Date.now()
                }
            };

        if(Array.isArray(cids)) {
            for(let index = 0; index < cids.length; index++) {
                data.ordering = parseInt(orderings[index]);
                await MainModel.updateOne({_id: cids[index]}, data)
            }
            return Promise.resolve("Success");
        }else{
            return MainModel.updateOne({_id: cids}, data);
        }
    },

    deleteItem: async (id, userLogin, options = null) => {
        if(options.task == "delete-one") {
            let itemConfig = await module.exports.getItem(id);
            if(itemConfig.system != 'yes')
                return MainModel.deleteOne({_id: id});
            return false;
        }

        if(options.task == "delete-mutli") {
            let andQuerySystem  = {system:'no'};
            let andQueryId  = {_id: {$in: id }};
            return MainModel.remove({ $and: [ andQueryId, andQuerySystem] });
        }
    },

    saveItem:  (item, userLogin, options = null) => {
        item.startTime = new Date(item.startDateNumber);
        item.endTime = new Date(item.endDateNumber); 
        // if(item.location=="General")
        // {
        //     item.value =  item.value.replace(/(<([^>]+)>)/igm,""); // lọc bỏ các thẻ html
        // }
        if(options.task == "add") {          
            item.created = {
				user_id: userLogin._id,
                user_name: userLogin.name,
				time: Date.now()
			},
            item.modified = {
				user_id: userLogin._id,
                user_name: userLogin.name,
				time: Date.now()
			}
			return new MainModel(item).save();
        }
        if(options.task == "edit") {
            return module.exports.saveEdit(item, userLogin, options); 
        }
        return true;
    },
    saveEdit: async (item, userLogin, options = null) => {
        let itemConfig = await module.exports.getItem(item.id);
        if((itemConfig.key =='Total_Items_Per_Page') || (itemConfig.key =='Page_Ranges')){
            item.value = publicFunction.replaceAll(item.value, ' ','');
            item.value = publicFunction.replaceAll(item.value, '\r','');
            item.value = publicFunction.replaceAll(item.value, '\n',''); 
            if(item.value % 1 !== 0){
                item.value = 5;// yes it's an integer.
             }
            if(item.value<1) item.value  = 10;  
        }
        if(itemConfig.system=='yes')
        {
            return MainModel.updateOne({_id: item.id}, {// cấu hình hệ thống chỉ thay đổi được 1 số số vị trí thôi
                value: item.value,
                description: item.description,
                status: item.status,
                ordering: parseInt(item.ordering),  
                image: item.image,                                 
                modified: {
                    user_id: userLogin._id,
                    user_name: userLogin.name,
                    time: Date.now()
                }
            });
        }
        else{
            return MainModel.updateOne({_id: item.id}, {
                key: item.key,
                useCKEditor: item.useCKEditor,
                value: item.value,
                location: item.location,
                startTime: item.startTime,
                endTime: item.endTime,
                description: item.description,
                status: item.status,              
                ordering: parseInt(item.ordering),
                system: item.system,  
                image: item.image,
                defaultValue: item.defaultValue,                  
                modified: {
                    user_id: userLogin._id,
                    user_name: userLogin.name,
                    time: Date.now()
                }
            });
        } 
    }

}