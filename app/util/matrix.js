var method = Matrix.prototype;

function Matrix (n,m){

	this.n = n;
	this.m = m;
	this.matrix = [];

	this.createMatrix();

}

method.constructor = Matrix

method.createMatrix = function(){
		var size = this.n;
		console.log(this.matrix);
		for (var x = 0; x < 101; x++) {
			var array = [];
			for (var y = 0; y < 101; y++) {
				var internal = [];
				for (var z = 0; z < 101; z++) {
					internal.push(0);
			}
			array.push(internal);
		}
		this.matrix.push(array);
	}

		console.log("Matrix created");
	}

method.updateMatrix =function(x,y,z,num,n){ 	
	for (var z1 = z; z1 <= n; z1 += z1 & (-z1)) {
		for (var y1 = y; y1 <= n; y1 += y1 & (-y1)) {
			for (var x1 = x; x1 <= n; x1 += x1 & (-x1)) {
				this.matrix[x1][y1][z1] += num;
			}
		}
	}

}, //Hace el update en la posición indicada y con el numero dentro de la matriz

method.sumMatrix = function (x,y,z){
		
		var add = 0; // variable donde se almacena la suma del rango dentro de la matriz

		for (var z1 = z; z1 > 0; z1 -= z1 & -z1) {
			for (var y1 = y; y1 > 0; y1 -= y1 & -y1) {
				for (var x1 = x; x1 > 0; x1 -= x1 & -x1) {
					add += this.matrix[x1][y1][z1];
				}
			}
		}

		return add;  // regresa la suma 

	}

	/* Esta Seccion es de Getters */


	method.getMatrix = function(){
		return this.matrix;	

	}

	method.getSize = function() {
		return this.n;

	}


module.exports = Matrix; 