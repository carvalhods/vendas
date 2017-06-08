module.exports = function(app) {
  var Venda = app.models.Venda;

  var controller = {
    listaVendas: function(req, res) {
      if (req.query.dataInicio && req.query.dataFim) {
        Venda.find({ $and: [
          {dataVenda: {$gte: req.query.dataInicio}},
          {dataVenda: {$lte: req.query.dataFim}}
        ]})
        .populate('itens.produto', 'codigo descricao unidade')
        .exec()
        .then(
          function(vendas) {
            res.status(200).json(vendas);
          },
          function(err) {
            res.status(500).json(err)
          }
        )
      } else {
        res.status(400).json('Os parâmetros de busca não foram informados corretamente');
      }
    },

    registraVenda: function(req, res) {
      var venda = req.body;
      if (venda.itens) {
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
