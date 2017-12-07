

'use strict';

module.exports = angular.module('newTestForm')
    .config(["$stateProvider",
        function($stateProvider) {
            $stateProvider
                .state('core.newtest', {
                    url: '/newTest',
                    abstract : true,
                    views : {
                        core : {
                            template: '<ui-view name="newTestForm"/>',
                            controller: function(){}
                        }
                    }
                }).state('core.newtest.form', {
                url: '/form',
                views : {
                    newTestForm : {
                        templateUrl: '/app/modules/new-test-form/partials/new-test-form.partial.html',
                        controller: 'newTestFormController as newTestFormController'
                    }
                }
            });
        }
    ]);