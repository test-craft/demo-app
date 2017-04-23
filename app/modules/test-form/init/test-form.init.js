'use strict';

require ('../style/test-form.style.scss');

module.exports = function(){
    return  {
        routes : [
            require('../routes/test-form.route.js')
        ],
        controllers : [
            require('../controllers/test-form.controller')
        ],
        services : [
            require('../services/test-form.service')
        ]
    };
};