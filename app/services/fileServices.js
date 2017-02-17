
var config = require('../config');
var fs = require('fs');

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
					res.status(500).send(err);
				}else{
					console.log("upload success!");
					res.send('File uploaded!');
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
