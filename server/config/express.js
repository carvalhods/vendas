var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var path = require('path');
var settings = require('./settings');

module.exports = function(){
	var app = express();
	app.set('port', settings.port);
	app.use(express.static(path.join(__dirname + './../../dist')));

	app.use(require('compression')());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	load('models', {cwd: 'server'})
	.then('controllers')
	.then('routes')
	.into(app);

	return app;
}
