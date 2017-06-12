var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var path = require('path');
var settings = require('./settings');

module.exports = function(){
	var app = express();
	app.set('port', settings.port);
	app.use(express.static(path.join(__dirname + './../../../dist')));

	app.use(require('compression')());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		next();
	});

	load('models', {cwd: 'src/server'})
	.then('controllers')
	.then('routes')
	.into(app);

	return app;
}
