angular.module("vendas").controller("ProdutoController",
    function($scope, $routeParams, Produto){

        $scope.toUpper = function(){
            $scope.produto.descricao = $scope.produto.descricao.toUpperCase();
        }


        $scope.produto = {
            codigo: 1001,
            descricao: 'Produto',
            qtde: 99,
            estoqueMin: 10,
            unidade: 'UN',
            valor: 1099.9
        }        
    }
)
