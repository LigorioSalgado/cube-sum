var express = require('express');
var swig	= require('swig');
var parser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(session({secret: '12345678'}));// configuracion de sesiones
app.use(parser.json()); // configuracion para parsear json

app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ 
	cache: false,
	varControls: ['[[', ']]'] 
	 });

//Configuracion swig
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',__dirname+'/app/views');

app.use(express.static("."));



app.listen(3000);


require('./app/controllers/cube')(app);


console.log ("Server works");