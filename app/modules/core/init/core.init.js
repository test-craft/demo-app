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
            require('../directives/header.directive'),
            require('../directives/context-click.directive')
        ],
        controllers : [
            require('../controllers/core.controller'),
            require('../controllers/header.controller')
        ]
    };
};