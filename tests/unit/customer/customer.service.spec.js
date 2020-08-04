
'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
require('sinon-mongoose');
var mongoose = require('mongoose');

var CustomerModule = require('../../../modules/customer/customer.module')();
var CustomerModel = CustomerModule.CustomerModel;
var CustomerService = CustomerModule.CustomerService;

var fixtures = require('../../fixtures/fixtures');
var CustomerFixture = fixtures.CustomerFixture;
var ErrorFixture = fixtures.ErrorFixture;

var CustomerModelMock;

describe('CustomerService', function(){

    // create mock model before each test. will be destroyed after tests
    beforeEach(function(){
        //that is fucking up this linee?
        CustomerModelMock = sinon.mock(CustomerModel);
    });

    afterEach(function(){
        CustomerModelMock.restore();

        mongoose.models = {};
        mongoose.modelSchemas = {};

        return mongoose.connection.close();
    });

    describe('createCustomer', function(){
        var newCustomer, expectedCreatedCustomer, expectedError;

        //create test 1
        it('should sucesfully create a new customer', function(){
            newCustomer = CustomerFixture.newCustomer;
            expectedCreatedCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('create').withArgs(newCustomer).resolves(expectedCreatedCustomer);

            return CustomerService.createCustomer(newCustomer)
                .then(function(data){
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedCreatedCustomer);
                });

        });

        //create test 2
        it('should throw error while creating customer', function(){
            expectedError = ErrorFixture.errorUnknown;
            newCustomer = CustomerFixture.newCustomer;
            expectedCreatedCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('create').withArgs(newCustomer).rejects(expectedError);

            return CustomerService.createCustomer(newCustomer)
                .catch(function(error){
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });

        });

    });

    describe('fetchCustomers', function(){
        var expectedCustomers, expectedError;

        //fetch all test 1
        it('should sucesfully fetch existing customers', function(){
            expectedCustomers = CustomerFixture.customers;

            CustomerModelMock.expects('find')
            .withArgs({})
            .chain('exec')
            .resolves(expectedCustomers);

            return CustomerService.fetchCustomers()
                .then(function(data){
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedCustomers);
                });

        });

        //fetch all test 2
        it('should throw error while fetching existing customers', function(){
            expectedError = ErrorFixture.errorUnknown;

            CustomerModelMock.expects('find')
            .withArgs({})
            .chain('exec')
            .rejects(expectedError);

            //the book says to use *fetchCustomers* syntax what is that??
            return CustomerService.fetchCustomers()
                .catch(function(error){
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });

        });


    });

    describe('fetchCustomerById', function(){
        var expectedFetchedCustomer, customerId, expectedError;

        //fetch customerbyid test 1
        it('should sucesfully fetch customer from ID', function(){
            expectedFetchedCustomer = CustomerFixture.createdCustomer;
            customerId = expectedFetchedCustomer._id;

            CustomerModelMock.expects('findById')
            .withArgs(customerId)
            .chain('exec')
            .resolves(expectedFetchedCustomer);

            return CustomerService.fetchCustomerById(customerId)
                .then(function(data){
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedFetchedCustomer);
                });

        });


        //fetch customer by id test 2
        it('should throw error while fetching customers with ID', function(){
            customerId = CustomerFixture.createdCustomer._id;
            expectedError = ErrorFixture.errorUnknown;
        

            CustomerModelMock.expects('findById')
            .withArgs(customerId)
            .chain('exec')
            .rejects(expectedError);

            //the book says to use *fetchCustomers* syntax what is that??
            return CustomerService.fetchCustomerById(customerId)
                .catch(function(error){
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });

        });

    });


    describe('updateCustomer', function(){
        var existingCustomer, expectedModifiedCustomer, expectedError;

        //update customer test 1
        it('should sucesfully update customer', function(){
            expectedModifiedCustomer = CustomerFixture.modifiedCustomer;
            existingCustomer = CustomerFixture.createdCustomer;
            

            CustomerModelMock.expects('findByIdAndUpdate')
            .withArgs(existingCustomer._id,existingCustomer,{new: true})
            .chain('exec')
            .resolves(expectedModifiedCustomer);

            return CustomerService.updateCustomer(existingCustomer._id, existingCustomer)
                .then(function(data){
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedModifiedCustomer);
                });

        });

        //update customer test 2
        it('should throw error while updating customer', function(){
            expectedError = ErrorFixture.errorUnknown;
            existingCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('findByIdAndUpdate')
            .withArgs(existingCustomer._id,existingCustomer,{new: true})
            .chain('exec')
            .rejects(expectedError);

            //the book says to use *fetchCustomers* syntax what is that??
            return CustomerService.updateCustomer(existingCustomer._id,existingCustomer,{new: true})
                .catch(function(error){
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });

        });

    });
    

    describe('deleteCustomer', function(){
        var existingCustomer, expectedError;

        //delete customer test 1
        it('should sucesfully delete customer', function(){
            existingCustomer = CustomerFixture.createdCustomer;
            

            CustomerModelMock.expects('findByIdAndRemove')
            .withArgs(existingCustomer._id)
            .chain('exec')
            .resolves(existingCustomer);

            return CustomerService.deleteCustomer(existingCustomer._id)
                .then(function(data){
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(existingCustomer);
                });

        });

        //deelete customer test 2
        it('should throw error while deleting customer', function(){
            expectedError = ErrorFixture.errorUnknown;
            existingCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('findByIdAndRemove')
            .withArgs(existingCustomer._id)
            .chain('exec')
            .rejects(expectedError);


            return CustomerService.deleteCustomer(existingCustomer._id)
                .catch(function(error){
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });

        });

    });


});