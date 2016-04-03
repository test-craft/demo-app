'use strict';

// style
require('../style/core.scss');

module.exports = function(coreModule){
    return {
        config : [
            require('config'),
            require('restangularConfig'),
            require('../config/theme.config')
        ],
        directives : [
            require('../directives/header.directive')
        ],
        controllers : [
            require('../controllers/core.controller'),
            require('../controllers/header.controller')
        ]
    };
};