'use strict';

module.exports = function(){
    return  {
        routes : [
            require('../routes/load.route.js')
        ],
        controllers : [
            require('../controllers/load.controller')
        ]
    };
};