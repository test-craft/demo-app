'use strict';

var _ = require('lodash');

function log(str){
    console.log(str);
}

module.exports = function(){
    log('===== Initializing application =====');
    var modules = [
        'core',
        'auth',
        'todo',
        'test-form',
        'load'
    ];

    var dep = [];

    // Modules
    log('Loading Modules:');
    var path;
    _.forEach(modules, function(name){
        log('-> Module [' + ('../modules/' + name + '/' + name + '.module.js') + ']');
        dep.push(require('../modules/' + name + '/' + name + '.module.js').name);
    });

    // Routes
    log('Routing Files:');
    _.forEach(modules, function(name){
        log('-> [' + ('../modules/' + name + '/routes/' + name + '.route.js') + ']');
        require('../modules/' + name + '/routes/' + name + '.route.js');
    });


    log('===== Initializing completed =====');
    return dep;
};