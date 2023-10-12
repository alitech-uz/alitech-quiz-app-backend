const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
	'user': {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	'date': { type: Date, default: Date.now() },
	'completedAt': Date,
	'questions': [{ question: { type: Schema.Types.ObjectId, ref: "Question" }, choosenAnswer: { type: String, default: null } }],
	'result': Number,
	'percentage': String
}, { timestamps: true });

AnswerSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Answer', AnswerSchema);
