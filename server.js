var http = require('http');
var app = require('./config/express')();
var settings = require('./config/settings');
require('./config/database')(settings.databasePath);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Aplicação rodando na porta ' + app.get('port'));
});
