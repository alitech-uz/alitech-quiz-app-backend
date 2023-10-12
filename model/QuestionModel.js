const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const optionSchema = new mongoose.Schema({
	variant: { type: String, required: true },
	title: { type: String, required: true },
	isCorrect: { type: Boolean, required: true },
});

const QuestionSchema = new Schema({
	'title': { type: String, required: true },
	'options': { type: [optionSchema], required: true },
	'level': { type: Number }
});
QuestionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Question', QuestionSchema);
