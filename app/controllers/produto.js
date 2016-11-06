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
            var _id = req.params.id;
            if (_id) {
                if (_id == 'novo') {
                    Produto.nextCount(function(err, count){
                        if (!err) {
                            var produto = new Produto();
                            produto.codigo = count;
                            res.json(produto);
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
                            res.json(produto) :
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
            var _id = req.body._id;
            if (_id) {
                Produto.findOne({_id: _id}).exec()
                .then(
                    function(produto){
                        if (produto){
                            for (var campo in req.body) {
                                if (campo != '_method') {
                                    produto[campo] = req.body[campo];
                                }
                            }
                            produto.save(function(err){
                                if (!err) {
                                    res.status(201).end();
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
            new Produto().checaVendas(req.params.id, function(erro, result){
                if (erro) {
                    res.status(500).send({message: erro.message});
                } else {
                    Produto.remove({_id: req.params.id})
                    .exec()
                    .then(
                        function(){
                            console.log('removeu');
                            res.status(204).end();
                        },
                        function(erro){
                            console.log('erro 2');
                            res.status(500).json(erro);
                        }
                    )
                }
            })
        }
    }

    return controller;
}
