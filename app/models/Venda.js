var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

module.exports = function(app){  

    var Schema = mongoose.Schema({
        itens: [
            {
                produto: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Produto"
                }
            }
        ]
    });

    return mongoose.model('Venda', Schema);
}
