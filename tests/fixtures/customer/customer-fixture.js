
(function(){
    'use strict';

    module.exports = {
        //declare attributes here to be exposed to other modules
        customers: require('./customers.json'),
        newCustomer: require('./new-customer.json'),
        createdCustomer: require('./created-customer.json'),
        modifiedCustomer: require('./modified-customer.json')
    };
    
})();