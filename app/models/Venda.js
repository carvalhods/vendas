var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;

module.exports = function(app){
    var itensSchema = mongoose.Schema({
      produto: {
          type: mongoose.Schema.ObjectId,
          ref: "Produto",
          required: true
      },
      qtde: {
          type: Number,
          required: [true, "Informe a qtde. de itens do produto"],
          min: [0.01, "A qtde. de itens do produto deve ser maior que zero"]
      },
      valorUnit: {
          type: Number,
          required: [true, "É necessário informar o valor unitário do produto"],
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

    vendaSchema.pre('save', function(next) {
        var Produto = app.models.Produto;
        var itens = this.itens;
        var codItens = [];
        var result = [];

        for (var i in itens) {
          codItens.push(itens[i].produto);
        }
        Produto.find({ _id: {$in: codItens} })
        .exec()
        .then(
          function(produtos) {
            if (produtos.length > 0) {
              var item = {};
              for (var i in produtos) {
                item = itens.find(
                  _item => JSON.stringify(_item.produto) == JSON.stringify(produtos[i]._id)
                );
                if (produtos[i].qtde < item.qtde) {
                  result.push("- " + produtos[i].descricao +
                              " (Qtde.: " + produtos[i].qtde +
                              " " + produtos[i].unidade + " disponíveis)");
                }
              }
              if (result.length > 0) {
                return next(new Error("A qtde. a ser vendida do(s) produto(s) " +
                  "a seguir é maior que a qtde. disponível em estoque:\n" + result.join('\n')));
              }
              next();
            } else {
              return next(new Error("A lista de compras está vazia"));
            }
          },
          function(err) {
              return next(new Error("Não foi possível verificar a disponibilidade do(s) produto(s) em estoque"));
          }
        )
    });

    vendaSchema.post("save", function(doc, next) {
      var Produto = app.models.Produto;
      var itens = this.itens;
      for (var i in itens) {
        Produto.update({_id: itens[i].produto},
                       {$inc: {qtde: -(itens[i].qtde ? itens[i].qtde : 0)} })
        .exec()
        .then(
          function(produto) {
          },
          function(err) {
            return next(new Error("A operação de venda foi registrada, porém não foi possível " +
                  "dar baixa em alguns produtos no estoque"));
          }
        )
      }
      next();
    });

    autoIncrement.initialize(mongoose.connection);
    vendaSchema.plugin(autoIncrement.plugin, {
        model: 'Venda',
        field: 'numero',
        startAt: 1,
        incrementBy: 1
    });

    return mongoose.model('Venda', vendaSchema);
}
