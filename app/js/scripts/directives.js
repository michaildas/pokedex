(function () {
    angular.module('pokedex')
        .directive("pokemons",function() {
            return {
                restrict: "E",
                templateUrl: "/templates/pokemons.html",
                controller: "PokemonsController",
                controllerAs: "pokemonsCtrl"
            }
        })

        .directive("favorites",function() {
            return {
                restrict: "E",
                templateUrl: "/templates/favorites.html",
                controller: "FavoritesController",
                controllerAs: "favoritesCtrl"
            }
        })

        .directive("pokemonDesc",function() {
            return {
                restrict: "E",
                templateUrl: "/templates/pokemon-desc.html",
            }
        })
})();