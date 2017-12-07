'use strict';

require ('../style/new-test-form.style.scss');

module.exports = function(){
    return  {
        routes : [
           require('../routes/new-test-form.route.js')
        ],
        controllers : [
           require('../controllers/new-test-form.controller')
        ],
        services : [
           require('../services/new-test-form.service')
        ]
    };
};