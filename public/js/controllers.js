var cubeSum = angular.module('cubeSum',[]);

cubeSum.directive('ngEnter', function () {
        return {
           controller: 'cubeCtrl',
           link: function (scope, elements, attrs) {
              elements.bind('keydown keypress', function (event) {
                  if (event.which === 13) {
                  	  //console.log("here");
                      scope.$apply(function () {
                          scope.$eval(attrs.ngEnter);
                      });
                      event.preventDefault();
                  }
              });
           }
        };
    });


cubeSum.controller('cubeCtrl',['$scope','$http', function($scope,$http){
	
	

	$scope.checkQuery = function() {
		console.log($scope.query.split(' '));
		
		var arr = $scope.query.split(' ')

		console.log("Key pressed");
		 
		$scope.query = "";


		

	};

	$scope.new_matrix = function(){
	$http.post('/matrix/new',$scope.query).success(function(response){
			console.log(response);
			
		}); 

	}

	
	

}]);