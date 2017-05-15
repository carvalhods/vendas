var http = require('http');
var app = require('./src/server/config/express')();
var settings = require('./src/server/config/settings');
require('./src/server/config/database')(settings.databasePath);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Aplicação rodando na porta ' + app.get('port'));
});
