'use strict';
angular.module('thoth', ['ngRoute','thoth.controllers', 'thoth.services', 'thoth.filters'])
.config(function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);
	// $stateProvider
 //        .state('services', {
 //        	URL: '/services',
	// 		templateUrl : 'views/templates/services.html',
	//         controller : 'servicesCtrl'
	// 	})
	// 	.state('fileupload', {
	// 		url: '/fileupload',
	// 		templateUrl : 'views/templates/fileupload.html',
	// 		controller : 'fileuploadCtrl'
	// 	})


	$routeProvider
    .when('/services', {
		templateUrl : 'views/templates/services.html',
        controller : 'servicesCtrl',
        cache : 'false'
	})

	
	.when('/fileupload', {
		templateUrl : 'views/templates/fileupload.html',
		controller : 'fileuploadCtrl',
		cache : 'false'
	})

	.when('/asset', {
		templateUrl : 'views/templates/asset.html',
		controller : 'assetCtrl',
		cache : 'false'
	})

    

	

});

