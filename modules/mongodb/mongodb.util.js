

(function(){
    'use strict';

    module.exports = {
        //declare attributes here to be exposed to other modules
        init: init
    };

    var mongoose = require('mongoose');
    var mongodbConfig = require('../../config/mongobd/mongodb-config.json').mongodb;

    function prepareConnectionString(config){
        var connectionString = 'mongodb://';

        if(config.user){
            connectionString += `${config.user}:${config.password}@`;
        }

        connectionString += `${config.server}/${config.database}`;

        return connectionString;
    }

    function init(){
        var options = {
            promiseLibrary: require('bluebird'), 
            useNewUrlParser: true
        };
        var connectionString = prepareConnectionString(mongodbConfig);

        mongoose
            .connect(connectionString,options)
            .then(function(result){
                console.log("MongoBD Connection sucessful. DB: " + connectionString);})
            .catch(function(error){
                console.log(error.message);
                console.log("error occured while connecting to DB:" + connectionString);
        });

        //** alternate formatting method **\\
        // mongoose.connect(connectionString,options)
        //     .then((result) => console.log("MongoBD Connection sucessful. DB: " + connectionString))
        //     .catch((error) => {
        //         console.log(error.message);
        //         console.log("error occured while connecting to DB:" + connectionString);
        //     }
        // );

    }

        //*** async version of init function ***\\
    // async function asyncInit() {
    //     try {
    //         var options = {
    //             promiseLibrary: require('bluebird'), 
    //             useNewUrlParser: true
    //         };
    //         var connectionString = prepareConnectionString(mongodbConfig);
    //         await mongoose.connect(connectionString, options);
    //         console.log(`MongoBD Connection sucessful. DB: ${connectionString}`);
    //     } catch (err) {
    //         console.error(err.message);
    //         console.log("error occured while connecting to DB:" + connectionString);
    //     }
    // }

//whoops

})();