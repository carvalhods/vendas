angular.module("vendas").controller("ProdutosController",
	function($scope, Produto, NgTableParams) {

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

		function buscaProdutos(){
			Produto.query(
				function(produtos){
					preencheTable(produtos);
				},
				function(erro){
					console.error(erro);
					preencheTable([]);
				}
			)
		}

		buscaProdutos();
	}
)
