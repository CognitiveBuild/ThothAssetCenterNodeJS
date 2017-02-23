
var auth = require('../auth/auth');
var db = require('../db/db');
var sql = require('../db/sql');
var mapping = require('../db/mapping');

var convertResponse = function(Obj,map,data){
	var paraObj = JSON.parse(JSON.stringify(Obj));
	var paraMap = JSON.parse(JSON.stringify(map));
	if(paraObj === undefined){
		return data;
	}else if (paraMap === undefined){
		paraObj[data] = data;
		return paraObj;
	}

	if(data.length>0){
		var tmpArray = [];
		for(i in data){
			var tmpObj ={};
			var dataObj = data[i];
			for(j in dataObj){
				if(paraMap[j] !== undefined){
					tmpObj[paraMap[j]] = dataObj[j];
				}else{
					tmpObj[j] = dataObj[j];
				}
			}
			tmpArray.push(tmpObj);
		}
		// need to confirm 
		for(k in paraObj){
			paraObj[k]["data"]=tmpArray;
			break;
 		}
		return paraObj;
	}else{
		return paraObj;
	}
	
};


module.exports = {
	getAdminInfo : function(req, res, next){
		
		var adminId = req.query.id; 
		console.log("Query AdminInfo:id is "+adminId);
		db.executeSql(sql.queryAdmin,[adminId],
			function(data){
				console.log("getAdminInfo success:"+ data);
				res.json(data);
				res.end();
			},
			function(err){
				res.send(err);
			});

	},
	getAsset : function(req, res, next){
		
		
		db.executeSql(sql.queryAsset,[],
			function(data){
				var ConMapping = new mapping.mappingConfig();
				var assetListObj = ConMapping.assetListObj;
				var assetConMapping = ConMapping.assetListMapping;
				console.log("Query Asset"+JSON.stringify(assetConMapping));
				var returnObj = convertResponse(assetListObj,assetConMapping,data);
				res.json(returnObj);
				// console.log("getAsset success:"+ data);
				// res.json(data);
				res.end();
			},
			function(err){
				
				res.send(err);
			});

	},
	getAssetByKey : function(req, res, next){
		if(req.query.id == undefined){
			var errorObj = {};
			errorObj.error = "Parameter Error"
			res.json(errorObj);
			res.end();
		}
		var AssetListId = req.query.id; 
		console.log("Query AssetList by AssetID");
		db.executeSql(sql.queryAssetByID,[AssetListId],
			function(data){
				var ConMapping = new mapping.mappingConfig();
				var assetListObj = ConMapping.assetListObj;
				var assetConMapping = ConMapping.assetListMapping;
				var returnObj = convertResponse(assetListObj,assetConMapping,data);
				console.log("AssetList success:"+ data);
				res.json(returnObj);
				res.end();
			},
			function(err){
				res.send(err);
			});

	},

	getAssetType : function(req, res, next){
		
		db.executeSql(sql.queryAssetType,[],
			function(data){
				res.json(data);
				res.end();
			},
			function(err){
				res.send(err);
			});

	},

	getIndustry : function(req, res, next){
		
		db.executeSql(sql.getIndustry,[],
			function(data){
				
				res.json(data);
				res.end();
			},
			function(err){
				res.send(err);
			});

	},

	getTeam : function(req, res, next){
		
		db.executeSql(sql.getTeam,[],
			function(data){
				res.json(data);
				res.end();
			},
			function(err){
				res.send(err);
			});

	},

	getUser : function(req, res, next){

		db.executeSql(sql.queryUser,[],
			function(data){
				res.json(data);
				res.end();
			},
			function(err){
				res.send(err);
			}
		);
	},
	putUser : function(req, res, next){
		var putObj = req.body;
		if(putObj.name === undefined || putObj.email === undefined  || putObj.twitter === undefined ){
			res.send("put user parameter error");
			return;
		}
		
		db.executeSql(sql.insertUser,[putObj.name,putObj.email,putObj.twitter],
			function(data){
				res.json(data);
				res.end();
			},
			function(err){
				res.send(err);
			}
		);
	},
	postUser : function(req, res, next){
		var putObj = req.body;
		if(putObj.user_id === undefined || putObj.name === undefined || putObj.email === undefined  || putObj.twitter === undefined ){
			res.send("post user parameter error");
			return;
		}
		
		db.executeSql(sql.updateUser,[putObj.name,putObj.email,putObj.twitter,putObj.user_id],
			function(data){
				res.json(data);
				res.end();
			},
			function(err){
				res.send(err);
			}
		);
	},

	deleteUser : function(req, res, next){
		var putObj = req.body;
		if(putObj.user_id === undefined  ){
			res.send("post user parameter error");
			return;
		}
		
		db.executeSql(sql.deleteUser,[putObj.user_id],
			function(data){
				res.json(data);
				res.end();
			},
			function(err){
				res.send(err);
			}
		);
	},

	getTechnology : function(req, res, next){
		
		db.executeSql(sql.getTechnology,[],
			function(data){
				res.json(data);
				res.end();
			},
			function(err){
				res.send(err);
			});

	},

	getAssetsByTechnology : function(req, res, next){
		var queryArr = [];
		var technologyId = '%%';
		var technologyName = '%%';
		if(req.query.id == undefined && req.query.name == undefined){
			var errorObj = {};
			errorObj.error = "Parameter Error"
			res.json(errorObj);
			res.end();
		}
		if(req.query.id !== undefined){
			technologyId = req.query.id; 
		}
		if(req.query.name !== undefined){
			technologyName = req.query.name; 
		}
		queryArr.push(technologyId);
		queryArr.push(technologyName);
		console.log("Query AssetList by Technology");
		db.executeSql(sql.getAssetsByTechnology,queryArr,
			function(data){
				var ConMapping = new mapping.mappingConfig();
				var assetListObj = ConMapping.assetListObj;
				var assetConMapping = ConMapping.assetListMapping;
				var returnObj = convertResponse(assetListObj,assetConMapping,data);
				console.log("Query AssetList by Technology success:"+ data);
				res.json(returnObj);
				res.end();
			},
			function(err){
				res.send(err);
			}
		);

	},

	getAssetsByIndustry : function(req, res, next){
		
		
		var queryArr = [];
		var industryId = '%%';
		var industryName = '%%';
		if(req.query.id == undefined && req.query.name == undefined){
			var errorObj = {};
			errorObj.error = "Parameter Error"
			res.json(errorObj);
			res.end();
		}
		if(req.query.id !== undefined){
			industryId = req.query.id; 
		}
		if(req.query.name !== undefined){
			industryName = req.query.name; 
		}
		queryArr.push(industryId);
		queryArr.push(industryName);
		console.log("Query AssetList by Industry");
		db.executeSql(sql.getAssetsByIndustry,queryArr,
			function(data){
				var ConMapping = new mapping.mappingConfig();
				var assetListObj = ConMapping.assetListObj;
				var assetConMapping = ConMapping.assetListMapping;
				var returnObj = convertResponse(assetListObj,assetConMapping,data);
				console.log("Query AssetList by Industry success:"+ data);
				res.json(returnObj);
				res.end();
			},
			function(err){
				res.send(err);
			}
		);

	},

};


