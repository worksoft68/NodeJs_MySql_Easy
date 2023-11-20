const mysql = require('mysql2/promise');

const createConnection = async () => {
   try {
      return await mysql.createConnection({
         namedPlaceholders: true,
         host:'localhost', 
         user: 'root', 
         database: 'futureoffice'
      });       
   } catch ( err ) {      
      return null;
   }
};

async function executeSql (sql) {  
   const conn = await createConnection();
   try {
      const [rows, fields] = await conn.query(sql);

      try{ conn.end(); }// close connect
      catch(errEnd){ 
         try{ conn.end(); } catch(errEnd2){}        
      }      
       return  rows;

   } catch (err) {
      console.log(err);
       try { conn.end(); }
       catch (err2){}      
       return data = {
           status: 'error',
           message: err
       }
   }   
}

let executeQuery = async (query, JsonParams=null) => {  
   const conn = await createConnection();
   try {
      const [rows, fields] = await conn.execute(query, JsonParams);
      try{ conn.end(); }// close connect
      catch(errEnd){ 
         try{ conn.end(); } catch(errEnd2){}        
      }      
       return  rows;
   } catch (err) {
      console.log(err);
       try { conn.end(); }
       catch (err2){}      
       return data = {
           status: 'error',
           message: err
       }
   }
}

let selectOne = async (query, JsonParams=null) => {  
   const conn = await createConnection();  
   try {
      const [rows, fields] = await conn.execute(query, JsonParams);
      try{ conn.end(); }// close connect
      catch(errEnd){ 
         try{ conn.end(); } catch(errEnd2){}        
      }   
     
      if(rows) return  rows[0];
      else return false;

   } catch (err) {
      console.log(err);
       try { conn.end(); }
       catch (err2){}      
       return data = {
           status: 'error',
           message: err
       }
   }
}

let selectAnyByPrimaryKey = async (schema, primaryKeyValue) => {
   const conn = await createConnection();
   try {
      let primaryKeyColumn = schema.primaryKeyColumn;
      let param = {primaryKeyColumn: primaryKeyValue};
      let query = " SELECT * FROM " + schema.table + " WHERE "+ primaryKeyColumn+" = :primaryKeyColumn "; 
      const [rows, fields] = await conn.query(query, param);
      
      try{ conn.end(); }// close connect
      catch(errEnd){ 
         try{ conn.end(); } catch(errEnd2){}        
      }  
     
      if(rows) return  rows[0];
      else return false;
   } catch (err) {
      console.log(err);
       try { conn.end(); }
       catch (err2){}      
       return data = {
           status: 'error',
           message: err
       }
   }
}


async function addAnything(schema, data){
   try{ 
      const conn = await createConnection();
      var keysData    = Object.keys(data);
      var keysChemas  = Object.keys(schema);
      let countKey    = keysData.length-1;  
      let SqlColumn   = "";
      let strSqlValue = "";

      for(let i=0; i < countKey; i++){   
         let column  = keysData[i];// keysData[i] is column name
         let index   = keysChemas.findIndex((key => key === column))
         if(index > -1){ 
             SqlColumn       += '`'+column + '`,';
             strSqlValue     += ':'+ column + ',';
         } 
     }// end for for(let i=0; i < countKey; i++)
     let columnEnd   = keysData[countKey]; // keysData[countKey] is the end  column name 
     let index       = keysChemas.findIndex((key => key === columnEnd))//
     if(index > -1) { //  found the column in the schema
         SqlColumn       += '`'+columnEnd+'`';
         strSqlValue     += ':'+ columnEnd;
     }
     else{
         SqlColumn   = SqlColumn.substring(0,SqlColumn.length-1); // remove the last comma
         strSqlValue = strSqlValue.substring(0,strSqlValue.length-1); // remove the last comma
     }
     let sqlString = ' INSERT INTO `' + schema.table + '` (' + SqlColumn+ ') VALUES (' + strSqlValue+ ') ';
      let resultAdd =  await conn.query(sqlString, data);
      //console.log(resultAdd);  
      
      try{ conn.end(); }// close connect
      catch(errEnd){ 
         try{ conn.end(); } catch(errEnd2){}        
      }      
      return resultAdd;
   }
   catch(err){
      console.log(err);
      return false;
   }
}


async function updateAnything2(schema, data, Id){
   try{ 
      const conn = await createConnection();
      var keysData    = Object.keys(data);
      var keysChemas  = Object.keys(schema);
      let countKey    = keysData.length-1;  
      let SqlUpdate   = "";      
      let primaryKeyColumn = schema.primaryKeyColumn;
      for(let i=0; i < countKey; i++){   
         let column  = keysData[i];// keysData[i] is column name
         let index   = keysChemas.findIndex((key => key === column))
         if(index > -1){ //  found the column in the schema
             SqlUpdate       += ' '+column + ' = :'+column+', ';                
             
         } 
     }// end for for(let i=0; i < countKey; i++)
     let columnEnd   = keysData[countKey]; // keysData[countKey] is the end  column name 
     let index       = keysChemas.findIndex((key => key === columnEnd))//
     if(index > -1) { //  found the column in the schema
         SqlUpdate       += ' '+columnEnd + ' = :'+columnEnd; 
     }
     else{         
         SqlUpdate   = SqlUpdate.substring(0,SqlUpdate.length-1); // remove the last comma        
     }
     data[primaryKeyColumn] = Id;
     let sqlString = ' UPDATE ' + schema.table + ' SET '+ SqlUpdate + ' WHERE  '+ primaryKeyColumn+' = :'+primaryKeyColumn;
     //let sqlString = ' UPDATE ' + schema.table + ' (' + SqlColumn+ ') VALUES (' + strSqlValue+ ') ';
     // let resultAdd =  await conn.query(sqlString, data);
      let resultAdd =  await conn.execute(sqlString, data);       
      
      try{ conn.end(); }// close connect
      catch(errEnd){ 
         try{ conn.end(); } catch(errEnd2){}        
      }      
      return resultAdd;
   }
   catch(err){
      console.log(err);
      return false;
   }
}

async function updateAnything(schema, data, Id){
   try{ 
      const conn = await createConnection();
      var keysData    = Object.keys(data);
      var keysChemas  = Object.keys(schema);
      let countKey    = keysData.length-1;  
      let SqlUpdate   = "";      
      let primaryKeyColumn = schema.primaryKeyColumn;
      for(let i=0; i < countKey; i++){   
         let column  = keysData[i];// keysData[i] is column name
         let index   = keysChemas.findIndex((key => key === column))
         if(index > -1){ //  found the column in the schema
             SqlUpdate       += ' '+column + ' = :'+column+', ';                
             
         } 
     }// end for for(let i=0; i < countKey; i++)
     let columnEnd   = keysData[countKey]; // keysData[countKey] is the end  column name 
     let index       = keysChemas.findIndex((key => key === columnEnd))//
     if(index > -1) { //  found the column in the schema
         SqlUpdate       += ' '+columnEnd + ' = :'+columnEnd; 
     }
     else{         
         SqlUpdate   = SqlUpdate.substring(0,SqlUpdate.length-1); // remove the last comma        
     }
     data[primaryKeyColumn] = Id;
     let sqlString = ' UPDATE ' + schema.table + ' SET '+ SqlUpdate + ' WHERE  '+ primaryKeyColumn+' = :'+primaryKeyColumn;
     
      let result =  await conn.execute(sqlString, data);       
      
      try{ conn.end(); }// close connect
      catch(errEnd){ 
         try{ conn.end(); } catch(errEnd2){}        
      }
      if(result){
			return result[0].affectedRows;					
		}	      
      return 0;
   }
   catch(err){
      console.log(err);
      return 0;
   }
}

let deleteAnythingByPrimaryKey = async (schema, primaryKeyValue) => {
   const conn = await createConnection(); 
   try {
       let primaryKeyColumn = schema.primaryKeyColumn;
       let parameters = {
         'primaryKeyColumn' : primaryKeyValue
       }
      let sqlString = ' DELETE FROM `' + schema.table + '` WHERE `'+ primaryKeyColumn+'` = :primaryKeyColumn';  
      // let result = true;
      let result =  await conn.query(sqlString, parameters);
      try{ conn.end(); }// close connect
      catch(errEnd){ 
         try{ conn.end(); } catch(errEnd2){}        
      } 
      if(result){
         let ResultSetHeader = result[0];
         if(ResultSetHeader.affectedRows>0)
            return true
         else return false;
      }
      //return result;     
   } catch (err) {      
      console.log(err);
   }
   return false;
}

let deleteObject = async (sql, JsonParams=null) => {
   const conn = await createConnection();   
   try {
      let result =  await conn.query(sql, JsonParams);
      try{ conn.end(); }// close connect
      catch(errEnd){ 
         try{ conn.end(); } catch(errEnd2){}        
      } 
      if(result){
         let ResultSetHeader = result[0];
         if(ResultSetHeader.affectedRows>0)
            return true
         else return false;
      }
   } catch (err) {
      console.log(err);
       try { conn.end(); }
       catch (err2){}      
       return data = {
           status: 'error',
           message: err
       }
   }   
   return false;
}





 async function addAnything_K_Cach2(schema, data){
   try{
      //data["Id"] = 4;
      //ALTER TABLE loaihanghoa MODIFY COLUMN Id INT auto_increment;
     // ALTER TABLE `loaihanghoa` AUTO_INCREMENT=10;
      const conn = await createConnection();
      const sqlString = " INSERT INTO loaihanghoa(TenGoi, FileDinhKem) VALUES (:TenGoi,:FileDinhKem)";
      let resultAdd =  await conn.query(sqlString,data);
      console.log(resultAdd);
      return resultAdd;
//resultAdd = 
      // [
      //    ResultSetHeader {
      //      fieldCount: 0,
      //      affectedRows: 1,
      //      insertId: 10,
      //      info: '',
      //      serverStatus: 2,
      //      warningStatus: 9
      //    },
      //    undefined
      //  ]

   }
   catch(err){
      console.log(err);
      return false;
   }
 }

 async function addAnything_K_Cach1(schema, data){
   try{
      data["Id"] = 2;
      const conn = await createConnection();
      const sqlString = " INSERT INTO loaihanghoa(Id, TenGoi, FileDinhKem) VALUES ("+data.Id+",'"+data.TenGoi+"','"+data.FileDinhKem+"')";
      let resultAdd =  await conn.execute(sqlString);
      return resultAdd;
   }
   catch(err){
      console.log(err);
   }
 }

 // Lỗi
 async function addAnythingTes(schema, data){
   try{
      const conn = await createConnection();
      const queryString = 'INSERT INTO loaihanghoa SET ?';
      let temp =  await conn.execute(queryString, data);
   }
   catch(err){
      console.log(err);
   }
 }


 async function addAnything1(schema, data){
   try{
      
   }
   catch(err){
      
   }
}

 module.exports = { 
   executeSql, 
   executeQuery,
   selectOne,
   selectAnyByPrimaryKey,  
   addAnything,
   updateAnything,
   updateAnything2,
   deleteAnythingByPrimaryKey,
   deleteObject,    
}



