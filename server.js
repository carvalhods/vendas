var http = require('http');
var app = require('./server/config/express')();
var settings = require('./server/config/settings');
require('./server/config/database')(settings.databasePath);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Aplicação rodando na porta ' + app.get('port'));
});
