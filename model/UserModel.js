const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	'firstName': { type: String, required: true },
	'lastName': String,
	'phone': { type: String, unique: true, required: true },
	'password': { type: String, required: true },
	'dob': Date,
	'email': String,
	'isAdmin': { type: Boolean, default: false }
},
	{
		timestamps: true,
	});
UserSchema.plugin(mongoosePaginate)
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		return next();
	} catch (err) {
		return next(err);
	}
});

UserSchema.methods.validatePassword = function (password) {
	return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);
