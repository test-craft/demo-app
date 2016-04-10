'use strict';

require ('../style/todo.style.scss');

module.exports = function(){
    return  {
        routes : [
            require('../routes/todo.route.js')
        ],
        controllers : [
            require('../controllers/todo-list.controller')
        ],
        services : [
            require('../services/todo.service')
        ]
    };
};