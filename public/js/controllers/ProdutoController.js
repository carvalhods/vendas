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
            if($scope.produto.descricao) {
                $scope.produto.descricao = $scope.produto.descricao.toUpperCase();
            }
        };

        function toFloat(valor) {
            if (typeof valor == "string" ) {
                return parseFloat(valor.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
            }
            return valor;
        }

        $scope.salva = function(){

            $scope.produto.valor = toFloat($scope.produto.valor);

            if ($routeParams.id != 'novo') {
                Produto.update(
                    $scope.produto,
                    function(){
                        console.log('Salvo com sucesso');
                    },
                    function(erro){
                        console.log(erro);
                        if (erro.data) {
                            for (var attr in erro.data.errors) {
                                //console.log(erro.data.errors[attr]);
                            }
                        }
                    }
                );
            } else {
                Produto.save(
                    $scope.produto,
                    function(){
                        console.log('Salvo com sucesso');
                    },
                    function(erro){
                        console.error(erro);
                    }
                );
            }
        }
    }
)
.directive('dropdown', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elms, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$render = function() {
                elms.dropdown('set selected', ngModel.$viewValue);

                elms.dropdown({
                    onChange: function(value, text, $selectedItem) {
                        ngModel.$setViewValue(value);
                    }
                });
            };
        }
    };
})
.directive('masked', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elms, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$render = function() {
                setTimeout(function(){
                    elms.maskMoney('mask', parseFloat(ngModel.$viewValue));
                }, 50);
            };
        }
    };
})