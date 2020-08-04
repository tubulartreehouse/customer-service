
'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');

var bluebird = require('bluebird');
var Promise = bluebird.Promise;

var CustomerModule = require('../../../modules/customer/customer.module')();
var CustomerMiddleware = CustomerModule.CustomerMiddleware;
var CustomerService = CustomerModule.CustomerService;

var fixtures = require('../../fixtures/fixtures');
var CustomerFixture = fixtures.CustomerFixture;
var ErrorFixture = fixtures.ErrorFixture;

var req, res, next;

describe('CustomerMiddleware', function(){

    beforeEach(function(){
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = sinon.spy();
    });

    describe('addCustomer', function(){
        var createCustomer, createCustomerPromise, expectedCreatedCustomer, expectedError;

        beforeEach(function(){
            createCustomer = sinon.stub(CustomerService,'createCustomer');
            req.body = CustomerFixture.newCustomer;
        });

        afterEach(function(){
            createCustomer.restore();
        });

        //add customer test 1
        it('should sucesfully create a new customer', function(){
            expectedCreatedCustomer = CustomerFixture.createdCustomer;

            createCustomerPromise = Promise.resolve(expectedCreatedCustomer);

            createCustomer.withArgs(req.body).returns(createCustomerPromise);

            CustomerMiddleware.addCustomer(req,res,next);

            sinon.assert.callCount(createCustomer,1);

            return createCustomerPromise.then(function(){
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedCreatedCustomer);
                sinon.assert.callCount(next,1);
            });

        });


        //add customer test 2
        it('should throw error while creating a new customer', function(){
            expectedError = ErrorFixture.errorUnknown;

            createCustomerPromise = Promise.reject(expectedError);

            createCustomer.withArgs(req.body).returns(createCustomerPromise);

            CustomerMiddleware.addCustomer(req,res,next);

            sinon.assert.callCount(createCustomer,1);

            return createCustomerPromise.catch(function(error){
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });

        });

    });


    describe('getCustomers', function(){
        var fetchCustomers, fetchCustomersPromise, expectedCustomers, expectedError;

        beforeEach(function(){
            fetchCustomers = sinon.stub(CustomerService,'fetchCustomers');
            req.body = {};
        });

        afterEach(function(){
            fetchCustomers.restore();
        });

        //get customers test 1
        it('should sucesfully get all customers', function(){
            expectedCustomers = CustomerFixture.customers;

            fetchCustomersPromise = Promise.resolve(expectedCustomers);

            fetchCustomers.returns(fetchCustomersPromise);

            CustomerMiddleware.getCustomers(req,res,next);

            sinon.assert.callCount(fetchCustomers,1);

            return fetchCustomersPromise.then(function(){
                expect(req.response).to.be.a('array');
                expect(req.response.length).to.equal(expectedCustomers.length);
                expect(req.response).to.deep.equal(expectedCustomers);
                sinon.assert.callCount(next,1);
            });

        });

        //get customer test 2
        it('should throw error while getting all customers', function(){
            expectedError = ErrorFixture.errorUnknown;

            fetchCustomersPromise = Promise.reject(expectedError);

            fetchCustomers.returns(fetchCustomersPromise);

            CustomerMiddleware.getCustomers(req,res,next);

            sinon.assert.callCount(fetchCustomers,1);

            return fetchCustomersPromise.catch(function(error){
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });

        });

    });


    describe('getCustomerById', function(){
        var fetchCustomerById, fetchCustomerByIdPromise, expectedCustomer, expectedError;

        beforeEach(function(){
            fetchCustomerById = sinon.stub(CustomerService,'fetchCustomerById');
            req.body = {};
        });

        afterEach(function(){
            fetchCustomerById.restore();
        });

        //get customer by id test 1
        it('should sucesfully get customer by id', function(){
            expectedCustomer = CustomerFixture.createdCustomer;

            fetchCustomerByIdPromise = Promise.resolve(expectedCustomer);

            fetchCustomerById.withArgs(req.params.customerId).returns(fetchCustomerByIdPromise);

            CustomerMiddleware.getCustomerById(req,res,next);

            sinon.assert.callCount(fetchCustomerById,1);

            return fetchCustomerByIdPromise.then(function(){
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedCustomer);
                sinon.assert.callCount(next,1);
            });

        });

        //get customer by id test 2
        it('should throw error while getting all customers', function(){
            expectedError = ErrorFixture.errorUnknown;

            fetchCustomerByIdPromise = Promise.reject(expectedError);

            fetchCustomerById.withArgs(req.params.customerId).returns(fetchCustomerByIdPromise);

            CustomerMiddleware.getCustomerById(req,res,next);

            sinon.assert.callCount(fetchCustomerById,1);

            return fetchCustomerByIdPromise.catch(function(error){
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });

        });

    });


    describe('modifyCustomer', function(){
        var updateCustomer, updateCustomerPromise, expectedModifiedCustomer, expectedError;

        beforeEach(function(){
            updateCustomer = sinon.stub(CustomerService,'updateCustomer');
            req.body = CustomerFixture.modifiedCustomer;
            req.params.customerId = req.body._id;
        });

        afterEach(function(){
            updateCustomer.restore();
        });


        //modify customer test 1
        it('should sucesfully get customer by id', function(){
            expectedModifiedCustomer = CustomerFixture.modifiedCustomer;

            updateCustomerPromise = Promise.resolve(expectedModifiedCustomer);

            updateCustomer.withArgs(req.params.customerId, req.body).returns(updateCustomerPromise);

            CustomerMiddleware.modifyCustomer(req,res,next);

            sinon.assert.callCount(updateCustomer,1);

            return updateCustomerPromise.then(function(){
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedModifiedCustomer);
                sinon.assert.callCount(next,1);
            });

        });


        //modify customer test 2
        it('should throw error while getting all customers', function(){
            expectedError = ErrorFixture.errorUnknown;

            updateCustomerPromise = Promise.reject(expectedError);

            updateCustomer.withArgs(req.params.customerId,req.body).returns(updateCustomerPromise);

            CustomerMiddleware.modifyCustomer(req,res,next);

            sinon.assert.callCount(updateCustomer,1);

            return updateCustomerPromise.catch(function(error){
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });

        });


    });



    describe('removeCustomer', function(){
        var deleteCustomer, deleteCustomerPromise, expectedCustomer, expectedError;

        beforeEach(function(){
            deleteCustomer = sinon.stub(CustomerService,'deleteCustomer');
        });

        afterEach(function(){
            deleteCustomer.restore();
        });


        //remove customer test 1
        it('should sucesfully remove customer', function(){
            expectedCustomer = CustomerFixture.createdCustomer;

            deleteCustomerPromise = Promise.resolve(expectedCustomer);

            deleteCustomer.withArgs(req.params.customerId).returns(deleteCustomerPromise);

            CustomerMiddleware.removeCustomer(req,res,next);

            sinon.assert.callCount(deleteCustomer,1);

            return deleteCustomerPromise.then(function(){
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedCustomer);
                sinon.assert.callCount(next,1);
            });

        });

        //remove customer test 2
        it('should throw error while removing customer', function(){
            expectedError = ErrorFixture.errorUnknown;

            deleteCustomerPromise = Promise.reject(expectedError);

            deleteCustomer.withArgs(req.params.customerId).returns(deleteCustomerPromise);

            CustomerMiddleware.removeCustomer(req,res,next);

            sinon.assert.callCount(deleteCustomer,1);

            return deleteCustomerPromise.catch(function(error){
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });

        });


    });

});

