module.exports = function(app) {
    var controller = app.controllers.produto;

    app.route('/produtos')
        .get(controller.listaProdutos)
        .post(controller.insertProduto)
        .put(controller.updateProduto);

    app.route('/produtos/:id')
        .get(controller.getProduto)
        .delete(controller.deleteProduto);
}
