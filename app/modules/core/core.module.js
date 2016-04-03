'use strict';

require('restangular');
require('angular-local-storage');
require('angular-moment/angular-moment.min.js');
//require('jointjs');

require('angular-loading-bar/build/loading-bar.js');
require('angular-loading-bar/build/loading-bar.css');

require('angular-material-data-table/dist/md-data-table.css');
require('angular-material-data-table/dist/md-data-table.js');


var coreModule = angular.module('core', [
    require('angular-sanitize'),
    require('angular-ui-router'),
    require('angular-material'),
    require('angular-messages'),
    'restangular',
    'LocalStorageModule',
    'angularMoment',
    'angular-loading-bar',
    'md.data.table',
]);

// Intialize
require('./init/core.init')(coreModule);

module.exports = coreModule;

