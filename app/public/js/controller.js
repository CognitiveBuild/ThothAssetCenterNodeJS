'use strict';
angular.module('thoth.controllers',[]).
	controller('MainCtrl',function($rootScope,$scope,$location,$http,httpRequestServices,showIndicator){
		$rootScope.indicateProgress = {} ;
		$scope.ErrorInfo="";

		$scope.clickFileUpload = function(){
			$location.path("/fileupload");
		};
		$scope.clickServices = function(){
			$scope.serviceObj = {};
			
			$location.path('/services');
			var bodyObj = {};
			bodyObj.url = config.PATH_USER_GET;
			bodyObj.method = config.METHOD_GET;
			bodyObj.data = {};

			httpRequestServices.sendRequest(bodyObj).then(function(result){
				
				$scope.serviceObj.name = result;
			},function(err){
				$scope.serviceObj.name = err;
			})

		};

		$scope.queryAsset = function(){
			showIndicator.setIndicator();
			$scope.Asset = {};
			
			$location.path('/asset');

			httpRequestServices.queryAsset().then(function(result){
					$scope.items = httpRequestServices.getAssetObj();
					showIndicator.cancelIndicator();
				},
				function(err){
					showIndicator.cancelIndicator();
					$scope.ErrorInfo = "Query Failed";
			});

		}


		console.log('MainCtrl');
	}).
	controller('servicesCtrl',function($scope){
		console.log('servicesCtrl');
		$scope.servicesList = "angularjs servicelist";


	}).
	controller('fileuploadCtrl',function($scope,$http,$location){


		$scope.serverObj = {};
		$scope.infoObj = {};
		console.log('fileuploadCtrl');
		$scope.serverObj.url = config.FILE_UPLOAD_URL;

		$scope.formData = {};
		$scope.processForm = function(){
			
			var fd = new FormData();
			var file = document.querySelector('input[type=file]').files[0];
	        var file1 = $scope.formData.files;
	        // fd.append('userName',$scope.formData.name);
	       	$scope.infoObj.Asset_title = "Asset title"
	        $scope.infoObj.Asset_team_id = 1 ;
	        $scope.infoObj.Asset_industry_id = 1; 
	        $scope.infoObj.Asset_publish_date = "";
	        $scope.infoObj.AssetList_assettype_id = 1;
	        $scope.infoObj.AssetList_name = "asset name ";
	        $scope.infoObj.AssetList_description = "asset description ";
	        // $scope.infoObj.AssetList_url = "";
	        // $scope.infoObj.AssetList_serviceurl = "";



	        fd.append('InfoObj',JSON.stringify($scope.infoObj));
	        fd.append('uploadFile', file);
			$http({
		        method  : 'POST',
		        url     : config.FILE_UPLOAD_URL,
		        // data    : $.param($scope.formData),  // pass in data as strings
		        data    : fd,  // pass in data as strings
		        transformRequest: angular.identity , 
		        headers : { 'Content-Type': undefined }  // set the headers so angular passing info as form data (not request payload)
		    })
		    .then(function(data) {
		    		alert("File Upload Success!");
		    		$location.path('/asset');
		            console.log(data);
		            console.log('file upload success');
		            // $scope.message = data.message;
		            
		        },function(err){
		        	console.log('file upload fiailed');
	                // $scope.errorName = err.errors.name;
	                // $scope.errorSuperhero = err.errors.superheroAlias;
		        });

		};



	}).
	controller('assetCtrl',function($scope,$location,httpRequestServices,fileUploadServices){
		console.log('assetCtrl');

		// $scope.loadData= function() {
  //           alert(123);
	 //    }
	 //    $scope.loadData();
		
		// $scope.queryAsset = function(){
		// 	console.log("assetCtrl $scope.queryAsset");
		// 	$scope.Asset = {};
			
		// 	$location.path('/asset');
		// 	var bodyObj = {};
		// 	bodyObj.url = config.PATH_ASSET_GET;
		// 	bodyObj.method = config.METHOD_GET;
		// 	bodyObj.data = {};


		// 	// $scope.items = [{ASSET_ID:1,ASSETLIST_ID:1},{ASSET_ID:2,ASSETLIST_ID:2}];


		// 	httpRequestServices.sendRequest(bodyObj).then(function(result){
		// 		console.log("assetCtrl $scope.queryAsset success.");
		// 		$scope.Asset.name = result;
		// 		$scope.items = result.data.specialContent.data;
		// 	},function(err){
		// 		console.log("assetCtrl $scope.queryAsset failed.");
		// 		$scope.Asset.name = err;
		// 	})

		// };

		$scope.editAsset = function(id){
			console.log("click editAsset");
			alert("id is : "+ id);
		}

		$scope.queryAsset();

	})
