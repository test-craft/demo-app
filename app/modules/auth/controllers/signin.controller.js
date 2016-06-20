'use strict';

module.exports = angular.module('auth').controller('signinController', ['$log', '$scope', 'authService', '$mdToast', '$state',
    function($log, $scope, authService, $mdToast, $state){
        $log.info('Signin Controller Loaded');

        $scope.click = 0;

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

        this.clear = function(){
            this.email = '';
            this.password = '';
        };

        this.lowerLeftButton = function(){
            window.alert('Lower Right Button');
        }
    }
]);