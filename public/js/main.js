angular.module('vendas', ['ngRoute', 'ngResource', 'ngTable'])
	.config(function($routeProvider){

		$routeProvider.when("/produtos", {
			templateUrl: "partials/produtos.html",
			controller: "ProdutosController"
		});

		$routeProvider.otherwise({redirectTo: "/"});
	})
