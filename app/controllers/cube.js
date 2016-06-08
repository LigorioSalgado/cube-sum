var Matrix = require('./app/util/matrix')
 

var cubeController = function (app){

app.post('/matrix/new', function(req,res){
	if(!req.body) return res.sendStatus(400) // Excepcion en caso de que no haya ningún dato en el cuerpo de la petición

	var m1 = new Matrix(req.body.init);
	
	console.log(m1);

	

});







}

module.exports = cubeController;