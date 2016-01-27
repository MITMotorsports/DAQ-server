var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datasetSchema = new Schema({
    name: String,
    uploadDate: Date,
    data: [
	{
	    key: String,
	    name: String,
	    units: String,
	    values: [
		{
		    time: Number,
		    value: Schema.Types.Mixed
		}
	    ]
	}
    ]
});

var Dataset = mongoose.model('Dataset', datasetSchema);

datasetSchema.pre('save', function(next){
    var self = this;
    Dataset.find({name: self.name}, function(err, sets){
	if (!sets.length){
	    next();
	} else {
	    console.log('trying to add existing set');
	    next(new Error('dataset exists!'));
	}
    });
});
    

module.exports = Dataset;
