var Matrix = require('../util/matrix')
 

var cubeController = function (app){

app.post('/matrix/new', function(req,res){
	console.log("New request");
	if(!req.body) return res.sendStatus(400) // Excepcion en caso de que no haya ningún dato en el cuerpo de la petición

	 var number = parseInt(req.body.text);
	var m1 = new Matrix(number);
	
	if (!m1)console.log("Error");
	console.log("bien");

	

});







}

module.exports = cubeController;