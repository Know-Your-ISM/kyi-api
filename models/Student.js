const mongoose = require ("mongoose");

var StudentSchema = new mongoose.Schema({
	Name:
	{
		type: String,
		trim: true,
		required: true
	},
	Email:
	{
		type: String,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
		lowercase: true,
		default: "",
		trim: true
	},
	"Admission No": {
		type: String,
		trim: true,
		required: true
	},
	Sex: {
		type: String,
		trim: true,
		required: true,
		default: "Unspecified"
	},
	House: {
		type: String,
		trim: true,
		default: ""
	},
	Place: {
		type: String,
		trim: true,
		default: ""
	},
	Branch: {
		type: String,
		trim: true,
		default: ""
	},
},
{
	timestamps: true
});

StudentSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject({ virtuals: true });
	delete userObject["__v"];
	delete userObject["email"];
	return userObject;
}

module.exports = StudentSchema;