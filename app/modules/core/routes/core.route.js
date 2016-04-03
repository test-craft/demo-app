'use strict';

module.exports = angular.module('core')
    .config(['$urlRouterProvider', '$stateProvider',
       function($urlRouterProvider, $stateProvider) {
           $urlRouterProvider.otherwise('/auth/signin');

           $stateProvider
               .state('core', {
                   url: '',
                   abstract : true,
                   views : {
                       app : {
                           templateUrl: '/app/modules/core/partials/core.partial.html',
                           controller: 'coreController as coreController'
                       }
                   }
               });
       }
    ]);