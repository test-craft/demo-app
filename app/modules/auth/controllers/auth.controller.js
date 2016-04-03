'use strict';

module.exports = angular.module('auth').controller('authController', ['$log',
    function($log){
        $log.info('Auth Controller Loaded');
    }
]);