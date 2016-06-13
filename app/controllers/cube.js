var Matrix = require('../util/matrix')


var cubeController = function (app){


app.post('/matrix/new', function(req,res){
	var response = null;
	console.log("New request");
	if(!req.body) return res.sendStatus(400) // Excepcion en caso de que no haya ningún dato en el cuerpo de la petición

	var size = parseInt(req.body.size);
	if (size > 100 ){ // si el tamaño de la matriz es mayor que 100
			response = JSON.parse('{"status":3}');
			res.json(response);
	}else{
		var num_query = parseInt(req.body.querys);
		    global.matrix = new Matrix(size,num_query);//Crea un nuevo objeto del tipo 'Matrix'
			global.session = req.session; 
			global.session.querys = 0; // se inicializa el numero de querys

		if (!global.matrix){ // si el objeto matriz esta vacio
		    response = JSON.parse('{"status":0}'); 
			res.json(response);

		}else{
			response = JSON.parse('{"status":1}');// si se creo la matriz
			res.json(response); // regresa a la vista un json

		}

	}

});

app.post('/matrix/update', function(req,res){
	var response = null;
	global.session = req.session;
	global.session.querys = session.querys+1; // asuma en uno la session de querys
	console.log("Update matrix");

	if(!req.body) return res.sendStatus(400);
	var x = parseInt(req.body.x); // se conviete a entero el valor  obtenido
	var y = parseInt(req.body.y);
	var z = parseInt(req.body.z);
	var w = parseInt(req.body.w);

	if(!global.matrix){// si el objeto matrix esta vacio
			response = JSON.parse('{"status":4}'); 
			res.json(response);
	} else if (global.session.querys > global.matrix.getQuerys()){ // si el numero de quuerys en la sesion es mayor al solicitado
			response = JSON.parse('{"status":3}');
			res.json(response);

	}
	else {
			global.matrix.updateMatrix(x,y,z,w,function(err){ //llama a la funcion que modifica la matriz y regresa o no un error segun sea el caso
				

				if (err){// si hay error
					
					 response = JSON.parse(err);
				}
				else{
					response = JSON.parse('{"status":1}');
				}
			});
			console.log(response);
			res.json(response);
			
	}

});

app.post('/matrix/sum', function(req,res){
	var response = null;
	console.log("Sum matrix");
	global.session = req.session;
	global.session.querys = session.querys+1; 
	if(!req.body) return res.sendStatus(400);

	var x1 = parseInt(req.body.x1);
	var y1 = parseInt(req.body.y1);
	var z1 = parseInt(req.body.z1);

	var x2 = parseInt(req.body.x2);
	var y2 = parseInt(req.body.y2);
	var z2 = parseInt(req.body.z2);

	if(!global.matrix){ 
		response = JSON.parse('{"status":4}');
		res.json(response);

		
	}
	else if(global.session.querys > global.matrix.getQuerys()){

		response = JSON.parse('{"status":3}');
		res.json(response);
	}
	else{
		var val1 =global.matrix.sumMatrix(x2,y2,z2) - global.matrix.sumMatrix(x1 -1,y2,z2) - global.matrix.sumMatrix(x2, y1 - 1, z2) + global.matrix.sumMatrix(x1 - 1, y1 - 1, z2)
		var val2 = global.matrix.sumMatrix(x2, y2, z1 - 1) - global.matrix.sumMatrix(x1 - 1, y2, z1 - 1) - global.matrix.sumMatrix(x2, y1 - 1, z1 - 1) + global.matrix.sumMatrix(x1 - 1, y1 - 1, z1 - 1);

		var sum = val1 -val2


		console.log(sum);
		if(isNaN(sum)){ // si no es un entero valido
			response = JSON.parse('{"status":0, "error":"La suma excede la matriz"}');
		}else{
			response = JSON.parse('{"status":1, "sum":'+sum+'}');
		}
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