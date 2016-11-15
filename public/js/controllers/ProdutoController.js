angular.module("vendas").controller("ProdutoController",
    function($scope, $routeParams, Produto){

        $scope.toUpper = function(){
            $scope.produto.descricao = $scope.produto.descricao.toUpperCase();
        }

        
    }
)
