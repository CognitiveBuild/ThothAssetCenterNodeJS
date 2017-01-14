

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var dbServer = require('../services/dbServer');
var auth = require('../auth/auth');
var db = require('../db/db');



router.get('/', function(req, res, next) {
  res.send('welcome');
});

// router.get('/login/:id', function(req, res, next) {
//   res.send(auth.getToken(req.params.id));
// });
router.post('/login', auth.authenticate,function(req,res){
	console.log("login,get authenticate");
	res.end();
});


router.post('/logout',auth.isAuthenticated,auth.revokeToken,function(req,res){
	console.log("logout");
	res.send("logout");
	res.end();
});


// router.get('/admin/:id',auth.authenticate, user.getAdminInfo);

// HTTP Routing: url /admin/userid/userinfo
// router.get('/admin/:id/:info',auth.authenticate, user.getAdminInfo);

// GET/POST Request : url /admin?id=userid&info=userinfo
router.get('/admin', auth.isAuthenticated,auth.isAdmin,dbServer.getAdminInfo, function(req,res){

});





module.exports = router;
