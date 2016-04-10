'use strict';

module.exports = angular.module('todo')
    .config(['$stateProvider',
       function($stateProvider) {
           $stateProvider
               .state('core.todo', {
               url: '/todo',
               abstract : true,
               views : {
                   core : {
                       template: '<ui-view name="todo"/>',
                       controller: function(){}
                   }
               }
               }).state('core.todo.list', {
                   url: '/list',
                   views : {
                       todo : {
                           templateUrl: '/app/modules/todo/partials/todo-list.partial.html',
                           controller: 'todoListController as todoListController'
                       }
                   },
                   resolve : {
                       todoList : function(todoService){
                           return todoService.getList();
                       }
                   }
               });
       }
    ]);