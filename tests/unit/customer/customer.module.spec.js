
var chai = require('chai');
var expect = chai.expect;

var CustomerModule = require('../../../modules/customer/customer.module');

describe('CustomerModule', function(){


    describe('customer.module file', function(){

        //test 1
        it('should confirm that CustomerModule function exists', function(){
            //write expectation for behavior here
            expect(CustomerModule).to.be.a('function');
        });

        //test 2
        it('should confirm that CustomerModule function returns an object', function(){
            //write expectation for behavior here
            expect(CustomerModule()).to.be.a('object');
        });

        //test 3
        it('should confirm that CustomerController function exists', function(){
            //write expectation for behavior here
            expect(CustomerModule().CustomerController).to.be.a('function');
        });

        //test 4
        it('should confirm that CustomerMiddleware object exists', function(){
            //write expectation for behavior here
            expect(CustomerModule().CustomerMiddleware).to.be.a('object');
        });

         //test 5
         it('should confirm that CustomerService object exists', function(){
            //write expectation for behavior here
            expect(CustomerModule().CustomerService).to.be.a('object');
        });

        //test 6
        it('should confirm that CustomerModel function exists', function(){
            //write expectation for behavior here
            expect(CustomerModule().CustomerModel).to.be.a('function');
        });

   

    });

});