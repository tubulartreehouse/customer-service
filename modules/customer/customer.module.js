

(function(){
    'use strict';

    module.exports = init;
        //declare attributes here to be exposed to other modules

        function init(){
            return {
                CustomerController: require('./customer.controller'),
                CustomerMiddleware: require('./customer.middleware'),
                CustomerService: require('./customer.service'),
                CustomerModel: require('./customer.model'),

            };
        }


})();