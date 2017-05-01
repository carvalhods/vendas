var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;

module.exports = function(app){
    var itensSchema = mongoose.Schema({
      produto: {
          type: mongoose.Schema.ObjectId,
          ref: "Produto",
          unique: true,
          required: true
      },
      qtde: {
          type: Number,
          required: [true, "Informe a qtde. de itens de cada produto"],
          min: [0.01, "A qtde. de itens de cada produto deve ser maior que zero"]
      },
      valorUnit: {
          type: Number,
          required: [true, "É necessário informar o valor unitário de cada item"],
          min: [0.01, 'O valor unitário do produto deve ser maior que zero']
      }
    });

    var vendaSchema = mongoose.Schema({
        numero: {
          type: Number,
          required: true,
          index: { unique: true }
        },
        dataVenda: {
          type: Date,
          required: [true, "Informe a data da venda"],
          default: Date.now
        },
        itens: [itensSchema]
    });

    itensSchema.pre('save', function(next) {
      var Produto = app.models.Produto;
      var item = this;
      Produto.findOne({_id: item.produto})
      .exec()
      .then(
        function(produto) {
          if (produto) {
            if (produto.qtde < item.qtde) {
              return next(new Error("A qtde. do produto '" + produto.descricao +
                  "' a ser vendida é maior que a qtde. disponível em estoque (" +
                  produto.qtde + " " + produto.unidade + ")"));
            } else {
              next();
            }
          } else {
            return next(new Error("Um produto não está cadastrado"));
          }
        }
      )
    });

    autoIncrement.initialize(mongoose.connection);
    Schema.plugin(autoIncrement.plugin, {
        model: 'Venda',
        field: 'numero',
        startAt: 1,
        incrementBy: 1
    });

    return mongoose.model('Venda', vendaSchema);
}
