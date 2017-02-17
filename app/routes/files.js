var express = require('express');
var router = express.Router();
var fileServices = require('../services/fileServices');
router.get('/', function(req, res, next) {
  res.send('welcome files');
});


router.post('/fileUpload',fileServices.fileUpload,function(req,res,next){

});

router.get('/fileDownload', fileServices.fileDownload,function(req,res,next){
	
});



module.exports = router;
