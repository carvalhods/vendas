var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;

module.exports = function(app){
    var Schema = mongoose.Schema({
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
        itens: [
            {
                produto: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Produto"
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
            }
        ]
    });

    // Schema.pre('save', function(next) {
    //   var Produto = app.models.Produto;
    //   var venda = this;
    //   var produtos = [];
    //   var result = [];
    //
    //   for (var i in venda.itens) {
    //     produtos.push(venda.itens[i].produto);
    //   }
    //   Produto.find({_id: {$in: produtos} })
    //   .exec()
    //   .then(
    //     function(produtos) {
    //       for (var i in produtos) {
    //         if (produtos.length > 0) {
    //           if (produtos[i].qtde < venda.itens[i].qtde) {
    //             result.push("A qtde. do produto '" + produtos[i].descricao +
    //             "' a ser vendida é maior que a qtde. disponível em estoque (" +
    //             produtos[i].qtde + " " + produtos[i].unidade + ")");
    //           }
    //         } else {
    //           result.push("Produto do item " + (i+1) + " não está cadastrado");
    //         }
    //       }
    //     }
    //   )
    //
    //
    // })

    autoIncrement.initialize(mongoose.connection);
    Schema.plugin(autoIncrement.plugin, {
        model: 'Venda',
        field: 'numero',
        startAt: 1,
        incrementBy: 1
    });

    return mongoose.model('Venda', Schema);
}
