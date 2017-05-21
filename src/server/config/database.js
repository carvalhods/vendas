var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function(uri) {

  mongoose.connect(uri)
  .catch(function(err) {
    console.log(err);
  });

	mongoose.connection.on('connected', function(){
		console.log('Mongoose conectado');
	});

	mongoose.connection.on('disconnected', function(){
		console.log('Mongoose desconectado');
	});

	mongoose.connection.on('error', function(){
		console.error('Mongoose: falha na conexão');
	});

	process.on('SIGINT', function(){
		mongoose.connection.close();
		console.log('Mongoose encerrado');
		process.exit(0);
	});
}
