

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var dbServer = require('../services/dbServer');
var auth = require('../auth/auth');
var db = require('../db/db');


// /asset
router.get('/', function(req, res, next) {
  res.send('welcome asset');
});


router.get('/getList',dbServer.getAsset, function(req,res){

});
router.get('/getDetail',dbServer.getAssetByKey, function(req,res){

});




module.exports = router;
