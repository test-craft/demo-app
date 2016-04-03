'use strict';

require('../style/auth.style.scss');

module.exports = function(authModule){
    return  {
        routes : [
            require('../routes/auth.route.js')
        ],
        controllers : [
            require('../controllers/auth.controller'),
            require('../controllers/signin.controller')
        ],
        services : [
            require('../services/auth.service')
        ]
    };
};