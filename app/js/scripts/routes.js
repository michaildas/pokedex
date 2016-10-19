(function(){
angular.module('pokedex')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                    templateUrl: '/pages/all-pokemons/index.html'
                }
            )
            .when('/all-pokemons', {
                    templateUrl: '/pages/all-pokemons/index.html'
                }
            )
            .when('/liked-pokemons', {
                    templateUrl: '/pages/liked-pokemons/index.html'
                }
            )
            .otherwise({redirectTo: "/"})
    });
})();
