angular.module("vendas").factory("Produto",
    function($resource){
        return $resource("/produtos/:id", null, {
            'update': {
                method: 'PUT'
            }
        })
    }
)
