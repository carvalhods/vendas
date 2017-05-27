module.exports = function(app){
    var Produto = app.models.Produto;

    var controller = {
        listaProdutos: function(req, res){
            Produto.find()
            .sort({codigo: 1})
            .exec()
            .then(
                function(produtos) {
                    res.status(200).json(produtos);
                },
                function(erro) {
                    res.status(500).json(erro);
                }
            )
        },

        getProduto: function(req, res){
            var _id = req.params.id;
            if (_id) {
                if (_id == 'novo') {
                    Produto.nextCount(function(err, count){
                        if (!err) {
                            var produto = new Produto();
                            produto.codigo = count;
                            res.status(200).json(produto);
                        } else {
                            res.status(500).json(err);
                        }
                    });
                }
                else {
                    Produto.findById(_id)
                    .exec()
                    .then(
                        function(produto) {
                            produto ?
                            res.status(200).json(produto) :
                            res.status(404).json('Produto não localizado');
                        },
                        function(err){
                            res.status(500).json(err);
                        }
                    )
                }
            }
        },

        insertProduto: function(req, res){
            Produto.create(req.body)
            .then(
                function(produto){
                    res.status(201).json(produto);
                },
                function(erro){
                    res.status(500).json(erro);
                }
            )
        },

        updateProduto: function(req, res){
            var _id = req.body._id;
            if (_id) {
                Produto.findOne({_id: _id}).exec()
                .then(
                    function(produto) {
                        if (produto) {
                            produto.descricao = req.body.descricao;
                            produto.qtde = req.body.qtde;
                            produto.unidade = req.body.unidade;
                            produto.estoqueMin = req.body.estoqueMin;
                            produto.valor = req.body.valor;
                            produto.save(function(err){
                                if (!err) {
                                    res.status(201).json({success: true});
                                } else {
                                    res.status(500).json(err);
                                }
                            });
                        } else {
                            res.status(404).json('Produto não localizado');
                        }
                    },
                    function(err){
                        res.status(500).json(err);
                    }
                )
            }
        },

        deleteProduto: function(req, res){
            Produto.findOne({_id: req.params.id})
            .exec()
            .then(
                function(produto) {
                    if (produto) {
                        produto.remove(
                            function(err){
                                if (err) {
                                    res.status(500).json(err.message);
                                } else {
                                    res.status(204).send({success: true});
                                }
                            }
                        )
                    } else {
                        res.status(404).json('Produto não localizado');
                    }
                }
            )
        }
    }

    return controller;
}
