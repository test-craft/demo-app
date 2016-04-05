'use strict';

angular.module('core').controller('headerController', ['$scope', '$log',
    function($scope, $log){
        $log.info('Header Controller Loaded');

        this.onItem1Click = function() {
            window.alert('Click on Item1');
        };

        this.onItem2Click = function() {
            window.confirm('This is a question?');
        };

        this.onItem3Click = function() {
            window.open("http://www.google.com", "new-window, 'width=480, height=320");
        };
    }
]);