'use strict';

angular.module('testForm').controller('loadController', ['$scope', '$log', '$state', '$timeout',
    function($scope, $log, $state, $timeout){

        $scope.isLoading = true;

        $timeout(function(){
            $scope.isLoading = false;
        }, 6000);

    }
]);