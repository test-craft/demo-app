

'use strict';

module.exports = angular.module('testForm')
    .config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('core.test', {
                    url: '/testForm',
                    abstract : true,
                    views : {
                        core : {
                            template: '<ui-view name="testForm"/>',
                            controller: function(){}
                        }
                    }
                }).state('core.test.form', {
                url: '/form2',
                views : {
                    testForm : {
                        templateUrl: '/app/modules/test-form/partials/test-form.partial.html',
                        controller: 'testFormController as testFormController'
                    }
                }
            });
        }
    ]);