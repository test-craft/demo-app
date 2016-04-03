'use strict';

module.exports = angular.module('core').directive('header',[
    function(){
        return {
            restrict : 'E',
            template : require('../partials/header.partial.html'),
            controller : 'headerController',
            controllerAs : 'headerController'
        }
    }
]);