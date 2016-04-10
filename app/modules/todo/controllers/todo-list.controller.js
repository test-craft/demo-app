'use strict';

angular.module('todo').controller('todoListController', ['$log', 'todoList', '$state',
    function($log, todoList, $state){
        $log.info('Todo List Controller Loaded');

        var that = this;

        this.todoList = todoList;
        this.filterByTag = [];
        this.searchStrings = [];

        this.updateTagList = function() {
            this.allTags = [];
            todoList.forEach(function(todo) {
                that.allTags = that.allTags.concat(todo.tags);
            });
            this.allTags = this.allTags.sort().filter(function(item, pos, ary) {
                return !pos || item != ary[pos - 1];
            });
        };

        this.updateTagList();

        this.updateSearchStringsList = function(deleteSting, searchString) {
            if (deleteSting) {
                var index = this.searchStrings.indexOf(searchString);
                this.searchStrings.splice(index, 1);
                if (this.searchStrings.length === 0) {
                    this.todoList = todoList;
                }
                else {
                    this.searchByTodoName(false);
                }
            }
            else {
                this.searchByTodoName(true, searchString);
            }
        };

        this.searchByTodoName = function(simpleSearch, searchString) {
            if (simpleSearch) {
                this.todoList = this.todoList.filter(function(todo) {
                    return  todo.name.toLowerCase().indexOf(searchString) !== -1;
                });
            }
            else {
                this.todoList = this.todoList.filter(function(todo) {
                    return  that.searchStrings.every(function(searchString) {
                                return todo.name.indexOf(searchString) !== 1;
                            });
                });
            }
        };

        this.transformChip = function(chip) {
            return this.searchStrings.indexOf(chip) !== -1 ? null : chip;
        };

        this.clearFilters = function() {
            this.searchStrings = [];
            this.filterByTag = [];
            this.todoList = todoList;
        };

        this.filterListByTag = function() {
            if (this.filterByTag.length == 0) {
                this.todoList = todoList;
            }
            else {
                this.todoList = todoList.filter(function(todo){
                    return  todo.tags.filter(function(value) {
                                return that.filterByTag.indexOf(value) > -1;
                            }).length > 0;
                });
            }
        };

        this.querySearch = function(query) {
            return (query ? this.allTags.filter(function(el) { return el.indexOf(query) != -1; }) : []);
        };


        this.navigateTodo = function(todo){
            var prms = _.cloneDeep($state.params);
            prms.todoId = todo.todoId;
            prms.component = 0;
            if (todo.flow.length === 0) {
                //$state.go('core.organization.project.version.todo.composer', prms);
            }
            else {
                //$state.go('core.organization.project.version.todo.staticcomposer', prms);
            }
        };

        this.createTodo = function() {
            //var createScope = $rootScope.$new();
            //createScope.version = version;
            //createScope.dialogType = 'create';
            //$mdDialog.show({
            //    templateUrl: '/app/modules/todo/partials/todo-dialog.partial.html',
            //    controller: 'todoDialogController as todoDialogController',
            //    clickOutsideToClose: true,
            //    scope: createScope
            //}).then(function (todo) {
            //    if (typeof todo === 'object') {
            //        that.todoList.push(todo);
            //        that.updateTagList();
            //    }
            //});
        };

        this.deleteTodo = function(todo, event) {
            //event.stopPropagation();
            //var createScope = $rootScope.$new();
            //createScope.todo = todo;
            //createScope.version = version;
            //createScope.dialogType = 'delete';
            //$mdDialog.show({
            //    templateUrl: '/app/modules/todo/partials/todo-dialog.partial.html',
            //    controller: 'todoDialogController as todoDialogController',
            //    scope: createScope
            //}).then(function (todoId) {
            //    if (typeof todoId === 'string') {
            //        that.todoList = that.todoList.filter(function(todo) {
            //            return todo.todoId !== todoId;
            //        });
            //        that.updateTagList();
            //    }
            //});
        };
    }
]);