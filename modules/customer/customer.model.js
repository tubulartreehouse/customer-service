

(function(){
    
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var CustomerSchema = new Schema({
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        phoneNumber: {
            type: Number,
            require: true
        },
        address: String,
        city: String,
        state: String,
        zipCode: Number,
        country: String
    });


    module.exports = mongoose.model('customers', CustomerSchema);
        //declare attributes here to be exposed to other modules



})();