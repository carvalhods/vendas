angular.module("vendas").controller("ProdutoController",
    function($scope, $routeParams, Produto){
        Produto.get(
            { id: $routeParams.id },
            function(produto) {
                $scope.produto = produto;
            },
            function(erro){
                console.error(erro);
            }
        );
        
        $scope.toUpper = function(){
            $scope.produto.descricao = $scope.produto.descricao.toUpperCase();
        };
        
        $scope.salva = function(){
            
        }
    }
)
.directive('dropdown', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elms, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$render = function () {
                elms.dropdown('set selected', ngModel.$viewValue);                
            };

            elms.dropdown({
                inline: true,
                onChange: function (value, text, $choice) {
                    ngModel.$setViewValue(value);
                }
            });
        }
    };
})