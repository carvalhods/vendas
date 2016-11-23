angular.module("vendas").controller("ProdutosController",
	function($scope, Produto, NgTableParams, $location) {

		function preencheTable(produtos) {
			produtos = produtos.map(function(produto){
				if (produto.qtde <= produto.estoqueMin) {
					produto.status = "Baixo";
				} else {
					produto.status = "Normal";
				}
				return produto;
			});

			$scope.filterDef = {
				descricao: {
					id: "text",
					placeholder: "Localizar"
				}
			};

			$scope.produtosTable = new NgTableParams({
					page: 1,
					count: 10
				}, {
					counts: [],
					paginationMaxBlocks: 10,
					paginationMinBlocks: 2,
					dataset: produtos
				}
			);
		}
    
        $scope.remove = function(produto){
            $scope.status = {};
            Produto.delete(
                {id: produto._id},
                function(){
                    buscaProdutos();
                },
                function(erro){
                    trataErros(erro, "Não foi possível excluir o produto");
                }
            )
        }

		function buscaProdutos(){
			Produto.query(
				function(produtos){
					preencheTable(produtos);
				},
				function(erro){
					trataErros(erro, "Não foi possível obter a lista de produtos");
					preencheTable([]);
				}
			)
		}
    
		buscaProdutos();
    
        function trataErros(erro, msg) {
            console.error(erro);            
            $scope.status = {
                msg: msg,
                erros: []
            };            
            if (erro.data) {
                if (erro.data.errors) {
                    for (var attr in erro.data.errors) {
                        $scope.status.erros.push(erro.data.errors[attr].message);
                    }
                } else {
                    $scope.status.erros.push(erro.data.message || erro.data);
                }
            }
            else {
                $scope.status.erros.push('Falha na conexão com o servidor');
            }
        }
	}
)
