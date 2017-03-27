var auth = require('../auth/auth');
var db = require('../db/db');
var sql = require('../db/sql');
var config = require('../config');
var fs = require('fs');
var dbServer = require('./dbServer');

var fileExists = function(file,fileExists,fileNotExists){
	console.log("check file exists: file name is :"+file);
	fs.exists(file,function(exists){
		if(exists){
	    	
	    	fileExists('fileExists');
	 	}else{
	    	
	    	fileNotExists('fileNotExists');
	    }
	});
}

var genFileName = function(filedir,filename,cb){
	// var newFileName = filename;
	if(filename == undefined){
		return "undefinedFileName";
	}
	var index = 0;
	var genFile;
	var checkNewFile = function(){
		if(index==0){
			genFile = filedir + filename;
		}else{
			if(filename.lastIndexOf('.') > -1){
				
				genFile = filedir + filename.slice(0,filename.lastIndexOf('.')) + '-'+ index + filename.slice(filename.lastIndexOf('.'));
				
			}else{
				genFile = filedir + filename + '-'+index;
			}
		}
		console.log("genFile is:"+genFile);
		index++;
		fileExists(genFile,
			function(fileExists){
				console.log("File exists,file is:" +genFile );
				checkNewFile();
			},
			function(fileNotExists){
				console.log("File not exists,file is:"+genFile);
				index = 0 ;
				cb(genFile) ;
			}
		);
	};
	checkNewFile();
};

var insertAssetData = function(){

}

var getCurrentTimeStamp = function (){
        var datetime = new Date();
         var year = datetime.getFullYear();
         var month = ("00"+(datetime.getMonth() + 1)).substr(-2);
         var date = ("00"+(datetime.getDate() + 1)).substr(-2);
         var hour = ("00"+(datetime.getHours() + 1)).substr(-2);
         var minute = ("00"+(datetime.getMinutes() + 1)).substr(-2);
         var second = ("00"+(datetime.getSeconds() + 1)).substr(-2);
         var mseconds = datetime.getMilliseconds();
         return year + "-" + month + "-" + date+"-"+hour+"."+minute+"."+second+"."+mseconds;
        
};

var updataAssetInfo = function(obj, cb){
	
	var Asset_publish_date = getCurrentTimeStamp();

	var insertAsset = function(cbList){
		db.executeSql(sql.insertAsset,[obj.Asset_title,obj.Asset_team_id,Asset_publish_date,obj.Asset_industry_id],
			function(data){
				// cbList("File upload success",data);
				cbList();
			},
			function(err){
				cb("File upload failed",err);
			}
		);
	};
	

	var insertAssetList = function(){
		var Asset_asset_id = "";
		var executeInsert = function(){
			db.executeSql(sql.insertAssetList,[Asset_asset_id,obj.AssetList_assettype_id,obj.AssetList_name,obj.AssetList_description,obj.AssetList_url,obj.AssetList_serviceurl],
					function(data){
						cb("File upload success",data);
					},
					function(err){
						cb("File upload failed",err);
					}
				);
		}

		if(obj.Asset_asset_id == undefined || typeof(obj.Asset_asset_id) != "number"){

			db.executeSql(sql.selectMaxAssetId,[],function(data){

				Asset_asset_id = data[0].MAX_ASSET_ID; 
				executeInsert();
			},function(err){
				cb("File upload failed",err);
			});
		}else{
			Asset_asset_id = obj.Asset_asset_id;
			executeInsert();
		}


		
	}



	insertAsset(insertAssetList);


	// db.executeSql(sql.insertAsset,[obj.Asset_title,obj.Asset_team_id,Asset_publish_date,obj.Asset_industry_id],
	// 		function(data){
	// 			cb("File upload success",data);
	// 		},
	// 		function(err){
	// 			cb("File upload failed",err);
	// 		}
	// );
}




module.exports = { 
	fileUpload : function(req,res,next){
		var uploadFile ;
		var fileName;
		var uploadDirFile ; 
		var fileLength;

		if(!req.files){
			res.send('No files were uploaded!');
			return;
		}
		fileLength = req.files.uploadFile.data.length;
		console.log("uploadFile.data.length:"+fileLength);
		if(fileLength > config.maxUploadFileSize){
			res.send("File size more than "+ config.maxUploadFileSize/1024/1024 + "M, don't allow to upload! ");
			return;
		}

		

		uploadFile = req.files.uploadFile;
		fileName = req.files.uploadFile.name;
		// uploadDirFile = config.uploadFilesDir + fileName;
		var uploadFiles = function(newFileName){
			console.log("newFileName:"+newFileName);
			uploadFile.mv(newFileName,function(err){
				if(err){
					console.log("upload failed:"+ err);
					res.send("File upload failed"+":"+err);	
				}else{
					console.log("upload success!");
					var InfoObj = JSON.parse(req.body.InfoObj); 
					InfoObj.AssetList_url = newFileName; 
					InfoObj.AssetList_serviceurl = newFileName; 
					updataAssetInfo(InfoObj, function(mes,data){
						res.send(mes+":"+data);	
					});
					
					// res.send('File uploaded!');
				}
			});
		}
		var newFileName = genFileName(config.uploadFilesDir,fileName,uploadFiles);
	},
	fileDownload : function(req,res,next){
		if(req.query.id == undefined){
			var errorObj = {};
			errorObj.error = "File Name Error"
			res.json(errorObj);
			res.end();
		}
		var fileName = req.query.id; 
		var downloadFile = config.uploadFilesDir + fileName;
		console.log("DownLoad File:"+downloadFile);
		fileExists(downloadFile,function(fileExists){
				console.log("File "+ downloadFile+" exists,download...");
				res.download(downloadFile);
			},
			function(fileNotExists){
				console.log("File "+ downloadFile+" not exists!");
				res.send('No files were found! file is:'+downloadFile);
			}
		);
	},
	


}
