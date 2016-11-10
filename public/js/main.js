angular.module('vendas', ['ngRoute', 'ngResource', 'smart-table'])
	.config(function($routeProvider){

		$routeProvider.when("/produtos", {
			templateUrl: "partials/produtos.html",
			controller: "ProdutosController"
		});

		$routeProvider.otherwise({redirectTo: "/"});
	})
