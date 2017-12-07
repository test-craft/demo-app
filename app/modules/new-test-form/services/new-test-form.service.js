'use strict';

angular.module('newTestForm').factory('todoService', ['$log', '$q', '$http', '$httpParamSerializer',
    function($log, $q, $http, $httpParamSerializer){

        var todos = [
            {
                todoId : 111,
                name : 'Todo1',
                tags : ['Tag1', 'Tag2', 'Tag4'],
                description : 'To do number 1'
            },
            {
                todoId : 112,
                name : 'Todo2',
                tags : ['Tag3', 'Tag4'],
                description : 'To do number 2'
            }
        ];

        var service = {
            /**
             * Get list of todos
             * @returns {Promise}
             */
            getList : function(){
                return $q.resolve(todos);
            },

            /**
             * Create a todo
             * @param {Object} todoData
             * @returns {Promise}
             */
            create : function(todoData){
                todos.push(todoData);

                return $q.resolve(todoData);
            },

            /**
             * Get a todo
             * @param {String} todoId
             * @returns {Promise}
             */
            get : function(todoId) {
                var elem = _.find(todos, function(item){
                    return item.todoId === todoId;
                });

                return $q.resolve(elem);
            },

            ajax : function () {
                return $http({
                    method: 'POST',
                    url: 'https://fiddle.jshell.net/echo/json/',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: $httpParamSerializer,
                    transformResponse: function (x) {
                        return angular.fromJson(angular.fromJson(x));
                    },
                    data: {"delay": 10}
                }).then(function (result) {
                    return result;
                }, function (err) {
                    return err;
                });
           /*     return $http.post('http://fiddle.jshell.net/echo/json/', {
                    delay:  10
                }).then(function(response){
                   return response;
                });*/
            }
        };

        return service;
    }
]);