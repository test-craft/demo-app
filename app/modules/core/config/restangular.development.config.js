'use strict';

angular.module('core').config(['RestangularProvider',
    function(RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:3000/api');
    }
]).run(['Restangular',
    function(Restangular) {
        // this is a restangular bug
        // https://github.com/mgonto/restangular/issues/413#issuecomment-33704942
        Restangular.configuration.getIdFromElem = function(elem) {
            var route = elem.route;
            var split = route.split('-');
            for (var i = 1; i < split.length; i++){
                split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
            }
            route = split.join('');
            return elem[route + "Id"];
        }
    }
]);