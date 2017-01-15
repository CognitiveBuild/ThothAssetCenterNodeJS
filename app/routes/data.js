

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var dbServer = require('../services/dbServer');
var auth = require('../auth/auth');
var db = require('../db/db');


// /data
router.get('/', function(req, res, next) {
  res.send('welcome data');
});


router.get('/asset/getList',dbServer.getAsset, function(req,res){

});
router.get('/asset/getDetail',dbServer.getAssetByKey, function(req,res){

});
router.get('/asset/getAssetType',dbServer.getAssetType, function(req,res){

});

router.get('/user/getUser',dbServer.getUser, function(req,res){

});
router.post('/user/postUser',dbServer.postUser, function(req,res){
	
});
router.put('/user/putUser',dbServer.putUser, function(req,res){
	
});
router.delete('/user/deleteUser',dbServer.deleteUser, function(req,res){
	
});
router.get('/industry/getIndustry',dbServer.getIndustry, function(req,res){

});
router.get('/team/getTeam',dbServer.getTeam, function(req,res){

});


module.exports = router;
