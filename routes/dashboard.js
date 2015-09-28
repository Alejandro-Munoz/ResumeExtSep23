/**
 * Created by Alejandro on 9/18/2015.
 */
var express = require('express');
var router = express.Router();
Resume = require('../modules/Resume');


/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('dashboard', { title: 'Dashboard' });
 });


module.exports = router;
