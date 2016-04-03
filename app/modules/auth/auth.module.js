'use strict';
var authModule = angular.module('auth', []);

var auth = require('./init/auth.init')(authModule);

module.exports = authModule;


