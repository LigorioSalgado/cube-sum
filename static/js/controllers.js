var cubeSum = angular.module('cubeSum',[]);

cubeSum.directive('ngEnter', function () { // directiva modificada que detecta cuando la tecla 'enter ' es pulsada
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
	
	

	$scope.checkQuery = function() { // checa el comando introducido
		console.log($scope.query.split(' '));
		
		var arr = $scope.query.split(' ')

		switch(true){
			case (arr[0]>1 && arr[0]<=50 ): // caso para inicializar	
				console.log("Creamos la matrix");
				$scope.newMatrix(arr);
				break;
			case (arr[0] == "UPDATE" || arr[0] == "update" ): // caso para modificar
				console.log("Modificamos la matriz");
				$scope.updateMatrix(arr[1],arr[2]);
				break;
			case (arr[0] == "QUERY" || arr[0] == "query" ): // caso para sumar
				console.log("sumamos la matriz");
				$scope.sumMatrix(arr[1]);
				break;
			default :
				$scope.riseException();

		}

		console.log("Key pressed");
		 
		$scope.query = "";

		

	};

	$scope.newMatrix = function(arr){ // metodo para enviar peticion de creacion de matriz
		
		var  req  = '{"size" : '+ arr[0]+', "querys" : '+arr[1]+'}'; // string tipo json
		var obj = JSON.parse(req); // parsea string a un objeto json


		$http.post('/matrix/new',obj).success(function(response){ // realiza una peticion  http tipo POST
				switch(response.status){ 

					case 0: // error al crear
							$scope.class = "red";
							$scope.result = "Ooops! algo salio mal";
							break;
					case 1: // exito al crear
							$scope.class = "blue";
							$scope.result = "Matriz creada";
							break;

					case 3: // se excede del limite
							$scope.class = "yellow";
							$scope.result = "El limite no esta permitido";
							break;

			}
				
				
			}); 

	}

	$scope.updateMatrix = function(elements,num){
			var coord = elements.split("");// separa los elementos de un string y almacena en un array
			 console.log(coord);
			
			if(isNaN(coord[0]) || isNaN(coord[1]) || isNaN(coord[2]) || isNaN(num)){ // verifica si las coordenadas y el valor son enteros validos
				$scope.class = "red";
				$scope.result = "Se necesitan numeros en las coordenadas o en el valor";


			}

			else{
				var obj = JSON.parse('{"x":'+coord[0]+',"y":'+coord[1]+',"z":'+coord[2]+',"w":'+num+' }') ;
				$http.post('/matrix/update',obj).success(function(response){
						console.log(response);

						switch(response.status){

							case 0: //error
									$scope.class = "red";
									$scope.result = response.message;
									break;
							case 1: //exito
									$scope.class = "blue";
									$scope.result = "Matriz modificada en: "+coord[0]+coord[1]+coord[2];
									break;

							case 3: // querys excedidos
									$scope.class = "yellow";
									$scope.result = "excediste el numero de querys";
									break;

							case 4: //error se necesita inicializar
									$scope.class = "yellow";
									$scope.result = "Se necesita inicializar la matriz";
									break;

					}
						
				});

			}

	}

	$scope.sumMatrix = function (elements){
		var coord = elements.split("");
		if(isNaN(coord[0]) || isNaN(coord[1]) || isNaN(coord[2]) || isNaN(coord[3]) || isNaN(coord[4]) || isNaN(coord[5]) ) {
			$scope.class = "red";
			$scope.result = "Se necesitan numeros en las coordenadas";
		}
		else{
			
			var json = '{"x1":'+coord[0]+',"y1":'+coord[1]+',"z1":'+coord[2]+',"x2":'+coord[3]+',"y2":'+coord[4]+',"z2":'+coord[5]+' }'
			var obj = JSON.parse(json);
			$http.post('/matrix/sum',obj).success(function(response){

					switch(response.status){

						case 0: // error
								$scope.class = "red";
								$scope.result = response.error;
								break;
						case 1: // exito
								$scope.class = "blue";
								$scope.result = "Total de la suma: "+response.sum;
								break;

						case 3: // querys exedidos
								$scope.class = "yellow";
								$scope.result = "excediste el numero de querys";
								break;
						case 4: // error de inicializar matriz
								$scope.class = "yellow";
								$scope.result = "Se necesita inicializar la matriz";
								break;

			}

		});

	}
		
	}

	$scope.riseException = function (){ // cuando se ingresa cualquier cosa que no es un comando
		console.log("No hay nada aquí");
		$scope.class = "yellow";
		$scope.result = "Comando no valido";

	}

	
	

}]);