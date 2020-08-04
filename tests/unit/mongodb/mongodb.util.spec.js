
var chai = require('chai');
var expect = chai.expect;

var MongoDBUtil = 
require('../../../modules/mongodb/mongodb.module').MongoDBUtil;

describe('MongoDBUtil', function(){


    describe('mongodb.util file', function(){

        //test 1
        it('should read the mongodb.util file', function(){
            //write expectation for behavior here
            expect(MongoDBUtil).to.be.a('object');
        });

        //test 2
        it('should confirm init function exists', function(){
            //write expectation for behavior here
            expect(MongoDBUtil.init).to.be.a('function');
        });

    });

});