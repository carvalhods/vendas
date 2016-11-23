angular.module("vendas").controller("ProdutoController",
    function($scope, $routeParams, Produto){

        $scope.limpaMsg = function(){
            $scope.status = {
                salvo: false,
                erros: [],
                msg: null
            };
        }
        $scope.limpaMsg();

        function buscaProduto(_id){
            Produto.get(
                { id: _id },
                function(produto) {
                    $scope.produto = produto;
                },
                function(erro){
                    trataErros(erro);
                }
            );
        }
        buscaProduto($routeParams.id);

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
            $scope.status = { erros: [] };

            if (typeof $scope.produto.qtde != "number" || typeof $scope.produto.estoqueMin != "number") { 
                trataErros({data: {message: "O valor de 'Qtde.' ou 'Estoque Mínimo' não é um número válido"}});
                return null;
            }
            
            if ($routeParams.id != 'novo') {
                Produto.update(
                    $scope.produto,
                    function(){
                        $scope.status.salvo = true;
                        $scope.status.erros = [];
                        $scope.status.msg = 'Salvo com sucesso';                        
                    },
                    function(erro){
                        trataErros(erro);
                    }
                );
            } else {
                Produto.save(
                    $scope.produto,
                    function(){
                        $scope.status.salvo = true;
                        $scope.status.erros = [];
                        $scope.status.msg = 'Salvo com sucesso';
                        buscaProduto('novo');
                    },
                    function(erro){
                        trataErros(erro);
                    }
                );
            }
        }
        
        function trataErros(erro) {
            console.error(erro);
            $scope.status.salvo = false;
            $scope.status.msg = 'Não foi possível salvar os dados do produto';
            if (erro.data) {
                if (erro.data.errors) {
                    for (var attr in erro.data.errors) {
                        $scope.status.erros.push(erro.data.errors[attr].message);
                    }
                } else {
                    $scope.status.erros.push(erro.data.message || erro.data);
                }
            } else {
                $scope.status.erros.push('Falha na conexão com o servidor');
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
.directive('focusMe', function($timeout) {
  return {
    scope: { trigger: '=focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === true) { 
            element[0].focus();
            scope.trigger = false;          
        }
      });
    }
  };
})