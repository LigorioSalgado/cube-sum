var express = require('express');
var swig	= require('swig');
var parser = require('body-parser');
var app = express();

var db = mongo('contactlist',['contactlist']);
app.use(parser.json());

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

app.use(express.static("./public"));

app.get('/',function (req,res){
	res.render("index");
});

app.listen(3000);


require('./app/controllers/contactlist')(app);


console.log ("Server works");