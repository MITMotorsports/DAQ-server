var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/daqdb');

var app = express();

var Dataset = require('./datasetSchema.js');

app.post('/', function(req, res){
    console.log(req.body);
    var d = req.body;
    var newDataset = new Dataset({
	name: d.name || new Date().toString(),
	uploadDate: new Date(),
	data: d.data
    });

    newDataset.save(function(err){
	if (err) {
	    res.send(err.message);
	} else {
	    console.log('saved succesfully');
	}
    });
});
	 
app.get('/', function(req, res){
    if (req.param.name){
	Dataset.findOne({name: req.param.name}, function(err, set){
	    if (err) {
		console.log(err);
		res.send(err.message);
	    } else {
		res.send(JSON.stringify(set));
	    }
	});
    } else {
	Dataset.find({}, function (err, sets){
	    if (err) {
		console.log(err);
		res.send(err.message);
	    } else {
		var names = [];
		for (var i = 0; i < sets.length; i++){
		    names.push({
			'name' : sets[i].name,
			'uploadDate': sets[i].uploadDate
		    });
		}
		res.send(JSON.stringify(names));
	    }
	}
    });
});

module.exports = app;
