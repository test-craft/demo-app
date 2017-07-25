

'use strict';

module.exports = angular.module('testForm')
    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('core.load', {
                    url: '/load',
                    views : {
                        core : {
                            templateUrl: '/app/modules/load/partials/load.partial.html',
                            controller: 'loadController as loadController'
                        }
                    }
                });
        }
    ]);