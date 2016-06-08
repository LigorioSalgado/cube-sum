module.exports = function Matrix (n,m){

	this.n = n;
	this.m = m;
	this.matrix = [];


}

Matrix.prototype {

	constructor:Matrix,

	createMatrix:function(){
		var size = this.n;

		for (var i=0; i <= size; i++){
			for (var j=0; j<=size; j++){
				for(var h=0;h<=size;h++){

					this.matrix[i][j][h] = 0; // se crea la matriz en ceros 
				}
			}

		}

		console.log("Matrix created");
	}

	updateMatrix:function(x,y,z,num){ this.matrix[x][y][z] = num;	} //Hace el update en la posición indicada y con el numero dentro de la matriz

	sumMatrix: function (x1,y1,z1,x2,y2,z2){
		var x = x1; var y = y1; var z = z1; // Se asignan los valores de las primeras coordenadas  a variables genericas
		var add = 0; // variable donde se almacena la suma del rango dentro de la matriz

		for ( x ; x <= x2; x++){
			for ( y; y<=y2; y++){
				for(z; z<=z2 ;z++){

					add = add + this.matrix[x][y][z]; // Suma el volor dentro de los rangos solicitados 
				}
			}

		}

		return add;  // regresa la suma 

	}

	/* Esta Seccion es de Getters */


	getMatrix: function(){
		return this.matrix;	

	}

	getSize: function() {
		return this.n;

	}

}