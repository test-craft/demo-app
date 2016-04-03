'use strict';

angular.module('core').controller('headerController', ['$scope', '$log', '$rootScope', '$mdDialog',
    function($scope, $log, $rootScope, $mdDialog){
        $log.info('Header Controller Loaded');

        this.openAdministrationDialog = function(selection) {
            var createScope = $rootScope.$new();
            createScope.selection = selection;

            $mdDialog.show({
                templateUrl: '/app/modules/core/partials/administration-dialog.partial.html',
                controller: 'administrationController as administrationController',
                clickOutsideToClose: true,
                scope: createScope
            }).then(function (result) {
            });
        };
    }
]);