'use strict';

module.exports = angular.module('auth').service('authService', ['$log', 'BASE_URL', '$http', '$q',
    function($log, BASE_URL, $http, $q) {

        var allowed = [
            {
                userId : '100',
                user: 'admin@testcraft.io',
                password: '123456',
                name : 'Admin'
            }
        ];

        return {
            /**
             * Signin
             * @param {String} email
             * @param {String} password
             * @returns {HttpPromise}
             */
            signin : function(email, password) {
                //return $http.post(BASE_URL + '/auth/signin', {
                //    email : email,
                //    password : password
                //}).then(function(response){
                //
                //    return response.data;
                //});

                var elem = _.find(allowed, function(item){
                    return email === item.user && item.password === password;
                });

                if (!elem){
                    return $q.reject();
                }

                return $q.resolve(elem);
            }
        }
    }
]);