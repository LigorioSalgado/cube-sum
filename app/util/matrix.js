var method = Matrix.prototype;

Object.defineProperty(Error.prototype, 'toJSON', {
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
		for (var x = 0; x <= this.n; x++) {
			var array = [];
			for (var y = 0; y <= this.n; y++) {
				var internal = [];
				for (var z = 0; z <= this.n; z++) {
					internal.push(0);
			}
			array.push(internal);
		}
		this.matrix.push(array);
	}

		console.log("Matrix created");
	}

method.updateMatrix =function(x,y,z,num,exc){ 

	if( x > this.n || y > this.n || z > this.n){
		
		var err = new Error("Excede el rango de la matriz")
		err.status = 0
		exc(JSON.stringify(err));
	}
	else{
		
		exc(null);
		for (var z1 = z; z1 <= this.n; z1 += z1 & (-z1)) {
			for (var y1 = y; y1 <= this.n; y1 += y1 & (-y1)) {
				for (var x1 = x; x1 <= this.n; x1 += x1 & (-x1)) {
					this.matrix[x1][y1][z1] += num;
				}
			}
		}
	}
}, //Hace el update en la posición indicada y con el numero dentro de la matriz

method.sumMatrix = function (x,y,z){
		
		var add = 0; // variable donde se almacena la suma del rango dentro de la matriz
		if( x > this.n || y > this.n || z > this.n){

			return NaN;
		}
		else{
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

	/* Esta Seccion es de Getters */


	method.getMatrix = function(){
		return this.matrix;	

	}

	method.getSize = function() {
		return this.n;

	}

	method.getQuerys = function() {
		return this.m;

	}

	method.setMatrix = function() {
		this.matrix = null;

	}


module.exports = Matrix; 