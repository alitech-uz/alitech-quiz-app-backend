const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const SettingSchema = new Schema({
	'numberOfQuestions': Number
});
SettingSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Setting', SettingSchema);
