var method = Matrix.prototype;

Object.defineProperty(Error.prototype, 'toJSON', { // metodo modificado para parsear un objeto de la clase Error a un string tipo JSON
    value: function () {
        var alt = {};

        Object.getOwnPropertyNames(this).forEach(function (key) {
            alt[key] = this[key];
        }, this);

        return alt;
    },
    configurable: true,
    writable: true
});

function Matrix (n,m){ // constructor

	this.n = n; // tamaño
	this.m = m;// numero de querys
	this.matrix = []; // se inicia la matriz

	this.createMatrix();

}

method.constructor = Matrix

method.createMatrix = function(){// metodo que crea  la matriz 3D
		var size = this.n; // se asigna el tamaño  aunua variable
		
		for (var x = 0; x <= this.n; x++) { // se crea matriz en eje x
			var array = [];
			for (var y = 0; y <= this.n; y++) {// se crea matriz en eje y
				var internal = [];
				for (var z = 0; z <= this.n; z++) {// se crea matriz en eje z
					internal.push(0); // se inserta un 0  en la casilla actal
			}
			array.push(internal); // se inserta un array dentro de la casilla
		}
		this.matrix.push(array);// se completa la matriz
	}

		console.log("Matrix created");
	}

method.updateMatrix =function(x,y,z,num,exc){  // metodo que modifica la matriz

	if( x > this.n || y > this.n || z > this.n){ // comprueba si  los parametros dados estan dentro del rango de la matriz
		
		var err = new Error("Excede el rango de la matriz")
		err.status = 0
		exc(JSON.stringify(err)); // se regresa un estring tipo json si ocurre un error
	}
	else{
		
		exc(null);
		/* Busca la casilla que se quiere modificar*/
		for (var z1 = z; z1 <= this.n; z1 += z1 & (-z1)) {
			for (var y1 = y; y1 <= this.n; y1 += y1 & (-y1)) {
				for (var x1 = x; x1 <= this.n; x1 += x1 & (-x1)) {
					this.matrix[x1][y1][z1] += num;
				}
			}
		}
	}
}, 

method.sumMatrix = function (x,y,z){
		
		var add = 0; // variable donde se almacena la suma del rango dentro de la matriz
		if( x > this.n || y > this.n || z > this.n){

			return NaN; // regresa un objeto del tipo 'No valid integer'
		}
		else{
			/*  suma los campos  de los rangos especificados */
			for (var z1 = z; z1 > 0; z1 -= z1 & -z1) {
				for (var y1 = y; y1 > 0; y1 -= y1 & -y1) {
					for (var x1 = x; x1 > 0; x1 -= x1 & -x1) {
						add += this.matrix[x1][y1][z1];
					}
				}
			}

		return add;  // regresa la suma 
		}
	}

	/* Esta Seccion es de Getters y Setters*/


	method.getMatrix = function(){// obtiene la matriz
		return this.matrix;	

	}

	method.getSize = function() {// obtiene el tamaño	
		return this.n;

	}

	method.getQuerys = function() {// obtiene el numero de querys
		return this.m;

	}

	method.setMatrix = function() { // borra el contenido de una matriz
		this.matrix = null;

	}


module.exports = Matrix; 