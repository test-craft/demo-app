'use strict';

angular.module('todo').factory('todoService', ['$log', '$q',
    function($log, $q){

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
            }
        };

        return service;
    }
]);