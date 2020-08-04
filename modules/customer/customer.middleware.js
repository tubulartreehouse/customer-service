

(function(){
    'use strict';

    var CustomerService = require('./customer.module')().CustomerService;


    module.exports = {
        addCustomer: addCustomer,
        getCustomers: getCustomers,
        getCustomerById: getCustomerById,
        modifyCustomer: modifyCustomer,
        removeCustomer: removeCustomer
    };
        //declare attributes here to be exposed to other modules

    function addCustomer(req, res, next){
        CustomerService.createCustomer(req.body)
        .then(sucess)
        .catch(failure);

        function sucess(data){
            req.response = data;
            next();
        }

        function failure(error){
            next(error);
        }
    }

    function getCustomers(req, res, next){
        CustomerService.fetchCustomers()
        .then(sucess)
        .catch(failure);

        function sucess(data){
            req.response = data;
            next();
        }

        function failure(error){
            next(error);
        }
    }

    function getCustomerById(req, res, next){
        CustomerService.fetchCustomerById(req.params.customerId)
        .then(sucess)
        .catch(failure);

        function sucess(data){
            req.response = data;
            next();
        }

        function failure(error){
            next(error);
        }
    }

    function modifyCustomer(req, res, next){
        CustomerService.updateCustomer(req.params.customerId, req.body)
        .then(sucess)
        .catch(failure);

        function sucess(data){
            req.response = data;
            next();
        }

        function failure(error){
            next(error);
        }
    }

    function removeCustomer(req, res, next){
        CustomerService.deleteCustomer(req.params.customerId)
        .then(sucess)
        .catch(failure);

        function sucess(data){
            req.response = data;
            next();
        }

        function failure(error){
            next(error);
        }
    }




})();