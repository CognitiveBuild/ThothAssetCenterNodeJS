

var config = require('../config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var blacklist = require('express-jwt-blacklist');

var db = require('../db/db');
var sql = require('../db/sql');



var validateJwt = expressJwt({ secret: config.secrets.session });
var revokeJwt = expressJwt({secret: config.secrets.session,isRevoked: blacklist.isRevoked});


module.exports = {
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */

	isAuthenticated : function(req,res,next) {
	    var user; 
	            
	    if(req.query && req.query.hasOwnProperty('access_token')) {
	        user = jwt.decode(req.query.access_token);
	        req.headers.authorization = 'Bearer ' + req.query.access_token;
	    }else if(req.headers.authorization !== undefined){
	    	if(req.headers.authorization.substr(0,7)!=="Bearer "){
	    		req.headers.authorization = 'Bearer ' + req.headers.authorization;
	    		user = jwt.decode(req.headers.authorization);
	    	}else{
	    		user = jwt.decode(req.headers.authorization.substr(7));
	    	}
		}
		console.log("user is:"+user);

	    
	    
	    // validateJwt(req, res, next);

	    validateJwt(req, res, function(err) {
	        console.log("validateJwt callback!")
	        if(err){
	            console.log("error"+err);
	            console.log("req"+req);
	            res.sendStatus(401);
	        }
	        
	        
	        
	        blacklist.isRevoked({}, user, function(err, revoked) {
	          console.log("isRevoked:"+revoked);
	          if(revoked){
	            res.sendStatus(401);
	          }else{
	            next();
	          }
	          
	        })

	        
	    });
	},



	authenticate : function(req, res, next) {
		console.log("Trying to authenticate... [" + req.body.email + "]");
        var id = req.body.id;
        var tokenID = id+"_"+(new Date()).getTime();
		var token = jwt.sign({ _id: id,sub:tokenID }, config.secrets.session);

        res.cookie('token', JSON.stringify(token));
        // req.headers = {};
        req.headers.authorization = 'Bearer ' + token;
        expressJwt({secret: config.secrets.session})(req, res, function(err) {
          if(err){
            res.status(401)
          };
          console.log("Signed token: " + token);
          res.json({
                token: token
          });
          next();

        });

			
			
	},

	revokeToken : function(req, res, next){
	    revokeJwt(req,res,next);
	    var user; 
	    if(req.query && req.query.hasOwnProperty('access_token')) {
	        user = jwt.decode(req.query.access_token);
	    }else if(req.headers.authorization !== undefined){
	    	var token = req.headers.authorization.substr(0,7)=="Bearer " ? req.headers.authorization.substr(7) : req.headers.authorization;
	    	user = jwt.decode(token);
	    }

	    blacklist.revoke(user, function(err, revoked) {
	          console.log("revoke error"+err);
	          console.log("revoked"+revoked);
	          if(err){res.send("revoke error"+err)}
	          
	          next();
	    });

	},
	isAdmin : function(req, res, next){
		var user; 
	            
	    if(req.query && req.query.hasOwnProperty('access_token')) {
	        user = jwt.decode(req.query.access_token);
	        req.headers.authorization = 'Bearer ' + req.query.access_token;
	    }else if(req.headers.authorization !== undefined){
	    	if(req.headers.authorization.substr(0,7)!=="Bearer "){
	    		req.headers.authorization = 'Bearer ' + req.headers.authorization;
	    		user = jwt.decode(req.headers.authorization);
	    	}else{
	    		user = jwt.decode(req.headers.authorization.substr(7));
	    	}
		}
		
		var adminId = user._id;
		console.log("Query Admin:"+adminId);
		db.executeSql(sql.queryAdmin,[adminId],
			function(result){
				console.log("result.lenght : " + result.lenght);
				if(result.length > 0){

					next();
				}else{
					res.sendStatus(401);
					res.end();
				}
			},
			function(err){
				res.send(err);
			});
	}

}
