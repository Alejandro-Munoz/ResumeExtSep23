/**
 * Created by Alejandro on 9/22/2015.
 */
var mongoose = require('mongoose');
var schemaType = mongoose.Schema;
// todo: get the schematype and ObjectID
var restgenerator = require('../modules/simple_rest_generator');
var Resume = require('../modules/Resume');
mongoose.connect('mongodb://localhost/test', function (err) {
    if (!err) console.log('successfully connected to mongodb ... ');
    else console.log('was not able to connect to mongodb ... ');
});

/*var Resume = mongoose.model('resume', {
    name:  {
        type: String,
        unique: true,
        require: true
    },
    creationDate:Date,
    processDate:Date,
    status:String,
    email: String,
    phone: String,
    uuid: String,
    skills:mongoose.Schema.Types.Mixed

});*/


//module.exports = Resume;
module.exports = function (app) {
    app.use('/resumes', restgenerator(Resume));
};