module.exports = function(app) {
  var Venda = app.models.Venda;

  var controller = {
    listaVendas: function(req, res) {
      if (req.query.dataInicio && req.query.dataFim) {
        Venda.find()
        .populate('itens.produto')
        .exec()
        .then(
          function(produtos) {
            res.json(produtos);
          },
          function(err) {
            res.status(500).json(err)
          }
        )
      } else {
        res.status(400).json('Os parâmetros de busca não foram informados');
      }
    },

    registraVenda: function(req, res) {
      var venda = req.body;
      if (venda.itens) {
        venda.itens = JSON.parse(venda.itens);
        if (venda.numero) { delete venda.numero }
        Venda.create(venda)
        .then(
          function(venda) {
            res.status(201).json(venda);
          },
          function(err) {
            res.status(500).json({name: err.name, errors: err.errors, message: err.message});
          }
        )
      } else {
        res.status(500).json('Nenhum item adicionado');
      }
    }
  };

  return controller;
}
