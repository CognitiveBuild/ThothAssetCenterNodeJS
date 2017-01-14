
var auth = require('../auth/auth');
var db = require('../db/db');
var sql = require('../db/sql');


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

	}
	
};


