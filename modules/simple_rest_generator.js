/**
 * Created by Alejandro on 9/22/2015.
 */
/**
 * @module Simple Rest Generator
 * @description Generate a restful endpoint for a given Mongoose Model
 * */
var moment = require('moment');
var router = require('express').Router();

module.exports = function (MongooseModel) {
    // this callback is executed for all get requests to /resumes
    router.get('/', function (req, res) {
        // find call to mongoose
        MongooseModel.find(function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {
                res.status(200).json(response);
            }
        });
    });
    //end point for last week resumes
    router.get('/w/:date', function (req, res) {
        // find call to mongoose
        console.log('date from router******',req.params.date);
        //var start = new Date(req.params.date).toDateString();
        var end = moment();
        console.log('end date from router******',end.format('YYYY-MM-DD'));
        var start = moment().subtract(7,'day').format('YYYY-MM-DD');
        console.log('start date from router******',start);

        MongooseModel.find({"creationDate":{"$gte": start, "$lt": end}}, function (err, response) {
        //MongooseModel.find({"creationDate":{"$lt": start}}, function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {
                res.status(200).json(response);
            }
        });
    });
    //end point for last month resumes
    router.get('/m/:date', function (req, res) {
        // find call to mongoose
        console.log('date from router******',req.params.date);
        //var start = new Date(req.params.date).toDateString();
        var end = moment();
        console.log('end date from router******',end.format('YYYY-MM-DD'));
        var start = moment().subtract(30,'day').format('YYYY-MM-DD');
        console.log('start date from router******',start);

        MongooseModel.find({"creationDate":{"$gte": start, "$lt": end}}, function (err, response) {
            //MongooseModel.find({"creationDate":{"$lt": start}}, function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {
                res.status(200).json(response);
            }
        });
    });
    //end point for today resumes
    router.get('/today/', function (req, res) {
        MongooseModel.find({"creationDate":{"$gte": new Date('YYYY-MM-DD')}}, function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {
                res.status(200).json(response);
            }
        });
    });
    router.get('/:date', function (req, res) {
        // find call to mongoose
        var     date = moment().add(1,'day').format('YYYY-MM-DD');
        console.log('*****date',date);
        var startDate;
        var endDate;
        MongooseModel.find({'creationDate':date}, function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {
                res.status(200).json(response);
            }
        });
    });
    //endpoint to get resumes batch status
    router.get('/status/:id', function(req, res){
        console.log('status router*********');
        MongooseModel.find({uuid:req.params.id},function(err, results){
            if (err) res.status(500).json(err);
            else {
                res.status(200).json(results);
            }
        });
    });
    //endpoint to get resumes skills
    router.get('/skills/:skill', function(req, res){
        var query = {};
        query['skills.' + req.params.skill] = {$gte: 1};
        MongooseModel.find(query, function(err, results){
            console.log(results);
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json(results);
            }
        });

    });

    router.post('/', function (req, res) {
        (new MongooseModel(req.body)).save(function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {
                res.set('Location', 'http://localhost:3000/contacts/' + response._id);
                // todo: fix the correct path
                res.status(201).json(response);
            }
        });
    });


    router.put('/:id', function (req, res) {
        MongooseModel.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {

                res.status(200).json({ message: 'Succesfully updated data!' });
            }
        });
    });

    router.delete('/:id', function (req, res) {
        MongooseModel.findByIdAndRemove(req.params.id, function (err, response) {
            if (err) {
                res.status(500).json({ message: 'Something Broke!' });
            } else {
                res.status(200).json({ message: 'Succesfully deleted data!' });
            }
        });
    });

    return router;
};
