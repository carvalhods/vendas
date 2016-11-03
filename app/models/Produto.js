var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

module.exports = function(){
    var Schema = mongoose.Schema({
        codigo: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        descricao: {
            type: String,
            match: [/^[\wÀ-Úà-ú]+/, "A descrição do produto deve conter apenas letras no início"],
            minlength: [2, 'A descrição do produto precisa conter no mínimo {MINLENGTH} caracteres'],
            maxlength: [70, 'A descrição do produto deve conter no máximo {MAXLENGTH} caracteres']
        },
        unidade: {
            type: String,
            required: [true, "É necessário preencher o campo {PATH}"],
            enum: {
                values: ['UN', 'PÇ', 'CX', 'KG', 'M', 'M²', 'M³', 'L'],
                message: "O campo 'unidade' não foi preenchido corretamente"
            }
        },
        qtde: {
            type: Number,
            required: [true, "É necessário preencher o campo {PATH}"],
            default: 0,
            min: [0, 'A qtde. do produto deve ser maior ou igual a zero'],
            max: [9999999, 'Qtde. máxima ultrapassada']
        },
        estoqueMin: {
            type: Number,
            min: [0, 'O estoque mínimo deve ser maior ou igual a zero']
        },
        valor: {
            type: Number,
            required: [true, "É necessário preencher o campo {PATH}"],
            min: [0.01, 'O valor do produto deve ser maior que zero'],
            max: [9999999, 'Valor máximo ultrapassado']
        }
    });

    autoIncrement.initialize(mongoose.connection);
    
    Schema.plugin(autoIncrement.plugin, {
        model: 'Produto',
        field: 'codigo',
        startAt: 1000,
        incrementBy: 1
    });

    return mongoose.model('Produto', Schema);
}
