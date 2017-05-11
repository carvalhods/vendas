module.exports = function(app) {
  var controller = app.controllers.venda;

  app.route("/vendas")
    .get(controller.listaVendas)
    .post(controller.registraVenda);
}
