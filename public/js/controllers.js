var cubeSum = angular.module('cubeSum.',[]);


cubeSume.controller('AppCtrl',['$scope','$http', function($scope,$http){
	
	

	$scope.addContact = function() {
		console.log($scope.query);


		/*$http.post('/contactlist',$scope.contact).success(function(response){
			console.log(response);
			refresh();
		}); */

	};

	
	

}]);