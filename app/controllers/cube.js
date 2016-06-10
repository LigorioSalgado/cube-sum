var Matrix = require('../util/matrix')


var cubeController = function (app){

app.post('/matrix/new', function(req,res){
	console.log("New request");
	if(!req.body) return res.sendStatus(400) // Excepcion en caso de que no haya ningún dato en el cuerpo de la petición

	global.size = parseInt(req.body.size);
	var num_query = parseInt(req.body.querys);
	    global.matrix = new Matrix(global.size,num_query);
	

	if (!global.matrix){
		var response = JSON.parse('{"status":0}');
		res.json(response);

	}else{
		var response = JSON.parse('{"status":1}');
		res.json(response);

	}

	

});

app.post('/matrix/update', function(req,res){
	console.log("Update matrix");
	if(!req.body) return res.sendStatus(400);
	var x = parseInt(req.body.x);
	var y = parseInt(req.body.y);
	var z = parseInt(req.body.z);
	var w = parseInt(req.body.w);


	global.matrix.updateMatrix(x,y,z,w,global.size);

	//console.log(global.matrix.getMatrix());
	var response = JSON.parse('{"status":1}');

	res.json(response)


});

app.post('/matrix/sum', function(req,res){
	console.log("Sum matrix");
	if(!req.body) return res.sendStatus(400);

	var x1 = parseInt(req.body.x1);
	var y1 = parseInt(req.body.y1);
	var z1 = parseInt(req.body.z1);

	var x2 = parseInt(req.body.x2);
	var y2 = parseInt(req.body.y2);
	var z2 = parseInt(req.body.z2);

	var val1 =global.matrix.sumMatrix(x2,y2,z2) - global.matrix.sumMatrix(x1 -1,y2,z2) - global.matrix.sumMatrix(x2, y1 - 1, z2) + global.matrix.sumMatrix(x1 - 1, y1 - 1, z2)
	var val2 = global.matrix.sumMatrix(x2, y2, z1 - 1) - global.matrix.sumMatrix(x1 - 1, y2, z1 - 1) - global.matrix.sumMatrix(x2, y1 - 1, z1 - 1) + global.matrix.sumMatrix(x1 - 1, y1 - 1, z1 - 1);

	var sum = val1 -val2


	console.log(sum);

	var response = JSON.parse('{"status":1, "sum":'+sum+'}');

	res.json(response);

});








}

module.exports = cubeController;