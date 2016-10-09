'use strict';

angular.module('pokedex', ['ngRoute']);

(function () {
    angular.module('pokedex').controller('NavigationController', ["$scope", function ($scope) {
        $scope.link = 1;

        $scope.selectTab = function (setTab) {
            this.tab = setTab;
        };

        $scope.isSelected = function (checkTab) {
            return this.tab === checkTab;
        };
    }]).controller('PokemonsController', ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        $scope.pokemons = [];
        $scope.selectedPokemon = undefined;
        $scope.shownDesc = false;

        $scope.addPokemonToFavorites = function (pokemon) {
            if (localStorage.getItem(pokemon.pkdx_id)) {
                localStorage.removeItem(pokemon.pkdx_id);
            } else {
                localStorage.setItem(pokemon.pkdx_id, JSON.stringify(pokemon));
            }
        };

        $scope.choosePokemon = function (pokemon) {
            $scope.selectedPokemon = pokemon;
            $scope.shownDesc = false;
        };

        $scope.isSelected = function (id) {
            if ($scope.selectedPokemon) {
                if ($scope.selectedPokemon.pkdx_id == id) {
                    return true;
                }
            }
            return false;
        };

        $scope.showDesc = function () {
            if ($scope.selectedPokemon != undefined) {
                $scope.shownDesc = true;
            }
        };

        $scope.isLiked = function (id) {
            if (localStorage.getItem(id)) {
                return true;
            } else {
                return false;
            }
        };
        $http.get('../../../pokemons.json').success(function (data) {
            $scope.pokemons = data.objects;
            console.log($scope.pokemons);
        });
    }]).controller("FavoritesController", ["$scope", function ($scope) {
        $scope.likedPokemons = [];
        $scope.selectedPokemon = undefined;
        $scope.shownDesc = false;

        $scope.addPokemonToFavorites = function (pokemon) {
            if (localStorage.getItem(pokemon.pkdx_id)) {
                localStorage.removeItem(pokemon.pkdx_id);
            } else {
                localStorage.setItem(pokemon.pkdx_id, JSON.stringify(pokemon));
            }
        };

        $scope.choosePokemon = function (pokemon) {
            $scope.selectedPokemon = pokemon;
            $scope.shownDesc = false;
        };

        $scope.isSelected = function (id) {
            if ($scope.selectedPokemon) {
                if ($scope.selectedPokemon.pkdx_id == id) {
                    return true;
                }
            }
            return false;
        };

        $scope.showDesc = function () {
            if ($scope.selectedPokemon != undefined) {
                $scope.shownDesc = true;
            }
        };

        $scope.isLiked = function (id) {
            if (localStorage.getItem(id)) {
                return true;
            } else {
                if ($scope.selectedPokemon != undefined) {
                    if ($scope.selectedPokemon.pkdx_id == id) {
                        $scope.selectedPokemon = undefined;
                        $scope.shownDesc = false;
                    }
                }
                for (var i = 0; i <= $scope.likedPokemons.length; i++) {
                    if ($scope.likedPokemons[i].pkdx_id == id) {
                        $scope.likedPokemons.splice(i, 1);
                        break;
                    }
                }
                return false;
            }
        };

        function getLikedPokemons() {
            if (localStorage.length !== 0) for (var key in localStorage) {
                var elem = JSON.parse(localStorage.getItem(key));
                $scope.likedPokemons.push(elem);
            }
        }

        getLikedPokemons();
    }]);
})();
(function () {
    angular.module('pokedex').directive("pokemons", function () {
        return {
            restrict: "E",
            templateUrl: "/templates/pokemons.html",
            controller: "PokemonsController",
            controllerAs: "pokemonsCtrl"
        };
    }).directive("favorites", function () {
        return {
            restrict: "E",
            templateUrl: "/templates/favorites.html",
            controller: "FavoritesController",
            controllerAs: "favoritesCtrl"
        };
    }).directive("pokemonDesc", function () {
        return {
            restrict: "E",
            templateUrl: "/templates/pokemon-desc.html"
        };
    });
})();
(function () {
    angular.module('pokedex').config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/pages/all-pokemons/index.html'
        }).when('/all-pokemons', {
            templateUrl: '/pages/all-pokemons/index.html'
        }).when('/liked-pokemons', {
            templateUrl: '/pages/liked-pokemons/index.html'
        }).otherwise({ redirectTo: "/" });
    });
})();