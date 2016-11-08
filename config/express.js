var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var settings = require('./settings');

module.exports = function(){
	var app = express();
	app.set('port', settings.port);
	app.use(express.static('./public'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	load('models', {cwd: 'app'})
	.then('controllers')
	.then('routes')
	.into(app);

	return app;
}
