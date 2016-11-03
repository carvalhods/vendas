module.exports = function(app){
    var Produto = app.models.Produto;

    var controller = {
        listaProdutos: function(req, res){
            Produto.find()
            .sort({codigo: 1})
            .exec()
            .then(
                function(produtos) {
                    res.json(produtos);
                },
                function(erro) {
                    res.status(500).json(erro);
                }
            )
        },

        getProduto: function(req, res){

        },

        insertProduto: function(req, res){
            var produto = req.body;
            if (produto.codigo) { delete produto.codigo }
            Produto.create(produto)
            .then(
                function(produto){
                    res.json(produto);
                },
                function(erro){
                    res.status(500).json(erro);
                }
            )
        },

        updateProduto: function(req, res){

        },

        deleteProduto: function(req, res){

        }
    }

    return controller;
}
