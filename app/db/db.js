var ibmdb = require('ibm_db');
var config = require('../config');
var connObj;

var getQuestionMarkCount = function(str){
	if(/[?]/i.test(str)){
		return str.match(/[?]/ig).length;
	}
	return 0;
};

var isArray = function(obj){
	return Object.prototype.toString.call(obj) === '[object Array]'
};

var isString = function(obj){
	return Object.prototype.toString.call(obj) === '[object String]'
};


var generateSQL = function(sql,arr,errcb){
	if(sql == undefined || !isString(sql) ){
		errcb("SQL ERROR: SQL is undefined or SQL is not String.");
	}
	if(arr == undefined || !isArray(arr)){
		errcb("SQL ERROR: Parameter is undefined or Parameter is not Array.");
	}

	var returnSQL = sql;
	var sqlQMCount = getQuestionMarkCount(sql);
	if(sqlQMCount !== arr.length){
		errcb("SQL ERROR: Parameter don't match!");
	}else{
		for(i in arr){
			var v,t;
			v = arr[i];
			t = typeof v;
			if( v === undefined ){
				errcb("SQL ERROR: Parameter undefined!");
			}else if(v === null || t === 'number'){
				returnSQL = returnSQL.replace("?",v);
			}else if(t === 'string'){
				returnSQL = returnSQL.replace("?","'" + v + "'");
			}else {
				
				returnSQL = returnSQL.replace("?",v instanceof Blob  ? v.valueOf() : v.toString());
			}
			
		}
		console.log("SQL:"+returnSQL);
		return returnSQL;
	}
	


};

var _executeSql = function(sql,arr,successcb,errorcb){
	var SQLStr = generateSQL(sql,arr,function(err){
		errorcb(err);
	});
	connObj.query(SQLStr, function (err, data) {
    	if (err){ 
    		console.log(err,null);
    		errorcb(err);
    	}
    	else {
    		console.log("_executeSql result:"+data);
    		successcb(data);
    	}
 		
  	});
};


module.exports = {
	connectDB : function(cb){
		ibmdb.open(config.DB, function (err,conn) {
		 	if (err) {
		  		console.log("open db error");
		  		console.log(err);	
		  		cb(err,null);
		  	}else{

		  		connObj = conn;
		  		console.log("connect to DB successful!");
		  		cb(null,conn);
		  	}
		  	
		  	
		});
	},

	isConnected : function(){
		return connObj == undefined ? false : true;
	},

	executeSql : function(sql,arr,successcb,errorcb){
		if(!this.isConnected()){
			console.log("DB is not connected, connect again...")
			this.connectDB(function(err,conn){
				if(err){
					console.log("Connect DB Error:"+err);
					errorcb(err);
				}else{
					console.log("Connect DB success!");
					_executeSql(sql,arr,successcb,errorcb);
				}
				
			});

		}else{
			_executeSql(sql,arr,successcb,errorcb);
		}
		
	},
	query : function(SQLStr,cb){
		if(!this.isConnected()){
			this.connectDB(function(err,conn){
				if(err){
					errorcb(err);
				}else{
					connObj.query(SQLStr, cb);

				}
				
			});

		}else{
			connObj.query(SQLStr, cb);
		}
	}
}



