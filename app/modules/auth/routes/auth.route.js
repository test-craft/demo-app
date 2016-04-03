'use strict';

module.exports = angular.module('auth')
    .config(['$stateProvider',
       function($stateProvider) {
           $stateProvider
               .state('core.auth', {
                   url: '/auth',
                   abstract : true,
                   views : {
                       core : {
                           templateUrl: '/app/modules/auth/partials/auth.partial.html',
                           controller: 'authController as authController'
                       }
                   }
               }).state('core.auth.signin', {
                   url: '/signin',
                   views : {
                       auth : {
                           templateUrl: '/app/modules/auth/partials/signin.partial.html',
                           controller: 'signinController as signinController'
                       }
                   },
                    public : true
               })
           ;
       }
    ]);