
var chai = require('chai');
var expect = chai.expect;

var MongoDBModule = require('../../../modules/mongodb/mongodb.module')

describe('MongoDBModule', function(){


    describe('mongodb.module file', function(){

        it('should read the mongodb.module file', function(){
            //write expectation for behavior here
            expect(MongoDBModule).to.be.a('object');
        });

        it('should confirm MongoDBUtil exists', function(){
            //write expectation for behavior here
            expect(MongoDBModule.MongoDBUtil).to.be.a('object');
        });

    });

});