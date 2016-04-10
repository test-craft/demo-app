'use strict';

module.exports = angular.module('auth').controller('signinController', ['$log', 'authService', '$mdToast', '$state',
    function($log, authService, $mdToast, $state){
        $log.info('Signin Controller Loaded');

        this.signin = function(){
            authService.signin(this.email, this.password).then(function(response){
                var user = response.user;
                $log.info('User logged in [' + user.userId + ']');

                $mdToast.show($mdToast.simple().content('Signin Success').position('top right'));

                $state.go('core.todo.list');
            }, function(err){
                $mdToast.show($mdToast.simple().content('Error').position('top right'));
            });
        };
    }
]);