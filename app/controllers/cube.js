var Matrix = require('../util/matrix')


var cubeController = function (app){



app.post('/matrix/new', function(req,res){
	console.log("New request");
	if(!req.body) return res.sendStatus(400) // Excepcion en caso de que no haya ningún dato en el cuerpo de la petición

	var size = parseInt(req.body.size);
	var num_query = parseInt(req.body.querys);
	    global.matrix = new Matrix(size,num_query);
	

	if (!global.matrix){
		var response = JSON.parse('{"status":0}');
		res.json(response);

	}else{
		var response = JSON.parse('{"status":1}');
		res.json(response);

	}

	

});

app.post('/matrix/update', function(req,res){
	var response = null;
	console.log("Update matrix");
	if(!req.body) return res.sendStatus(400);
	var x = parseInt(req.body.x);
	var y = parseInt(req.body.y);
	var z = parseInt(req.body.z);
	var w = parseInt(req.body.w);

	if(global.matrix){
			global.matrix.updateMatrix(x,y,z,w,function(err){
				

				if (err){
					console.log("aqui");
					 response = JSON.parse(err);
				}
				else{
					response = JSON.parse('{"status":1}');
				}
			});
			console.log(response);
			res.json(response);
	}
	else {

			response = JSON.parse('{"status":4}');
			res.json(response);
	}

});

app.post('/matrix/sum', function(req,res){
	var response = null;
	console.log("Sum matrix");
	if(!req.body) return res.sendStatus(400);

	var x1 = parseInt(req.body.x1);
	var y1 = parseInt(req.body.y1);
	var z1 = parseInt(req.body.z1);

	var x2 = parseInt(req.body.x2);
	var y2 = parseInt(req.body.y2);
	var z2 = parseInt(req.body.z2);

	if(global.matrix){

		var val1 =global.matrix.sumMatrix(x2,y2,z2) - global.matrix.sumMatrix(x1 -1,y2,z2) - global.matrix.sumMatrix(x2, y1 - 1, z2) + global.matrix.sumMatrix(x1 - 1, y1 - 1, z2)
		var val2 = global.matrix.sumMatrix(x2, y2, z1 - 1) - global.matrix.sumMatrix(x1 - 1, y2, z1 - 1) - global.matrix.sumMatrix(x2, y1 - 1, z1 - 1) + global.matrix.sumMatrix(x1 - 1, y1 - 1, z1 - 1);

		var sum = val1 -val2


		console.log(sum);
		if(isNaN(sum)){
			response = JSON.parse('{"status":0, "error":"La suma excede la matriz"}');
		}else{
			response = JSON.parse('{"status":1, "sum":'+sum+'}');
		}
		res.json(response);
	}
	else {

		response = JSON.parse('{"status":4}');
		res.json(response);
	}

});



app.get('/',function (req,res){
	if (global.matrix == null){
		res.render("index");
	}else{
		global.matrix.setMatrix();
		res.render("index");
	}
});




}

module.exports = cubeController;