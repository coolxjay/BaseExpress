const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var qsortSchema = new Schema({
	statementNumber: {
		type: Number,
		min: 1,
		required: true
	},
	strength: {
		type: Number,
		min: -20,
		max: 20,
		required: true
	}
});

var responseSchema = new Schema({
	participant: {
		type: String,
		required: true
	},
	qsort: [qsortSchema]
});

var statementSchema = new Schema({
	statementNumber: {
		type: Number,
		min: 1,
		required: true
	},
	statement: {
		type: String,
		required: true
	}
});

var projectSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	statements: [statementSchema],
	responses: [responseSchema]
}, { timestamps: true});

var Projects = mongoose.model('Project', projectSchema);
module.exports = Projects;