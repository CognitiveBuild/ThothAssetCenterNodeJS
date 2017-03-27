'use strict';
angular.module('thoth.services',[]).
	factory('fileUploadServices',function(){
		
        return{
            getFileUpload : function(){
                console.log('fileUploadServices');
            }
        }
	}).
    factory('showIndicator',function($rootScope,$interval){
        
        var timer;
        var _setIndicator = function(){
            $rootScope.indicateProgress= {};
            var i = 0;
            var timer = $interval(function(){
                // if(i <= 90){
                   
                // }
                i= i+18;
                $rootScope.indicateProgress.width = "width: "+i+"% ";
                console.log($rootScope.indicateProgress.width);
            },100,5)
            console.log('fileUploadServices');
        };

        return{
            setIndicator : function(){
                _setIndicator();
                
            },
            cancelIndicator : function(){
                console.log("**cancelIndicator");
                $rootScope.indicateProgress.width = "width : 95%";
                $rootScope.indicateProgress.indicateDisplay = "display : none "
                $interval.cancel(timer);
            }
        }
    }).
	factory('httpRequestServices',function($location,$http,$q){
        var AssetObj = [];
		console.log('fileUploadServices');
        var _sendRequest = function(Obj){
        	var deferred = $q.defer();
        	// var host = config.HOST;
			var requestObj = {
        		headers: {
        			'Content-Type' : 'application/json; charset=UTF-8'
        		},
                url: config.HOST + Obj.url,
                method: Obj.method,
                data : Obj.data
            };

        	var s = $http(requestObj).then(
            	function(data) {
                    console.log('get data success: data is:'+ JSON.stringify(data));
                    // $scope.serviceObj.name = data;
                    deferred.resolve(data);
                },
                function(err) {
                    console.log("get error!");
                    deferred.reject(err);
                }
            );

        	return deferred.promise;
        };

		
		return {
			sendRequest : function(bodyObj){
				return _sendRequest(bodyObj);
			},
            queryAsset : function(){
                AssetObj = [];
                var deferred = $q.defer();
                var bodyObj = {};
                bodyObj.url = config.PATH_ASSET_GET;
                bodyObj.method = config.METHOD_GET;
                bodyObj.data = {};
                _sendRequest(bodyObj).then(function(result){
                    AssetObj = result.data.specialContent.data;
                    deferred.resolve("Success");
                },function(err){
                    deferred.reject("failed");
                });
                return deferred.promise;
            },
            getAssetObj : function(){
                return AssetObj;
            }
		}
	});


