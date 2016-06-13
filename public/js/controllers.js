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

		switch(true){
			case (arr[0]>1 && arr[0]<=50 ):
				console.log("Creamos la matrix");
				$scope.newMatrix(arr);
				break;
			case (arr[0] == "UPDATE" || arr[0] == "update" ):
				console.log("Modificamos la matriz");
				$scope.updateMatrix(arr[1],arr[2]);
				break;
			case (arr[0] == "QUERY" || arr[0] == "query" ):
				console.log("sumamos la matriz");
				$scope.sumMatrix(arr[1]);
				break;
			default :
				$scope.riseException();

		}

		console.log("Key pressed");
		 
		$scope.query = "";

		

	};

	$scope.newMatrix = function(arr){
		
		var  req  = '{"size" : '+ arr[0]+', "querys" : '+arr[1]+'}';
		var obj = JSON.parse(req);


		$http.post('/matrix/new',obj).success(function(response){
				switch(response.status){

					case 0: 
							$scope.class = "red";
							$scope.result = "Ooops! algo salio mal";
							break;
					case 1: 
							$scope.class = "blue";
							$scope.result = "Matriz creada";
							break;

					case 3: 
							$scope.class = "yellow";
							$scope.result = "El limite no esta permitido";
							break;

			}
				
				
			}); 

	}

	$scope.updateMatrix = function(elements,num){
			var coord = elements.split("");
			 console.log(coord);
			var obj = JSON.parse('{"x":'+coord[0]+',"y":'+coord[1]+',"z":'+coord[2]+',"w":'+num+' }') ;


		$http.post('/matrix/update',obj).success(function(response){
				console.log(response);

				switch(response.status){

					case 0: 
							$scope.class = "red";
							$scope.result = response.message;
							break;
					case 1: 
							$scope.class = "blue";
							$scope.result = "Matriz modificada en: "+coord[0]+coord[1]+coord[2];
							break;
					case 4: 
							$scope.class = "yellow";
							$scope.result = "Se necesita inicializar la matriz";
							break;

			}
				
		});

	}

	$scope.sumMatrix = function (elements){
		var coord = elements.split("");

		var json = '{"x1":'+coord[0]+',"y1":'+coord[1]+',"z1":'+coord[2]+',"x2":'+coord[3]+',"y2":'+coord[4]+',"z2":'+coord[5]+' }'
		var obj = JSON.parse(json);

		$http.post('/matrix/sum',obj).success(function(response){

				switch(response.status){

					case 0: 
							$scope.class = "red";
							$scope.result = response.error;
							break;
					case 1: 
							$scope.class = "blue";
							$scope.result = "Total de la suma: "+response.sum;
							break;
					case 4: 
							$scope.class = "yellow";
							$scope.result = "Se necesita inicializar la matriz";
							break;

			}

		});


		
	}

	$scope.riseException = function (){
		console.log("No hay nada aquí");
		$scope.class = "yellow";
		$scope.result = "Comando no valido";

	}

	
	

}]);