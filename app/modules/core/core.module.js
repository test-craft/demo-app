'use strict';

require('restangular');
require('angular-local-storage');
require('angular-moment/angular-moment.min.js');
//require('jointjs');

require('angular-loading-bar/build/loading-bar.js');
require('angular-loading-bar/build/loading-bar.css');

require('angular-material-data-table/dist/md-data-table.css');

require('angular-material-data-table/dist/md-data-table.js');
require('angular-drag-and-drop-lists/angular-drag-and-drop-lists.js');
var jquery = require('jquery/dist/jquery');
window.jquery = window.$ = window.jQuery = jquery;

require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.min');
require('jquery/dist/jquery.min');

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
    'dndLists',
    'ngMaterial',
    'ngMessages'


]);

// Intialize
require('./init/core.init')(coreModule);

module.exports = coreModule;

