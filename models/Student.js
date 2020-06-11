const mongoose = require ("mongoose");

var StudentSchema = new mongoose.Schema({
	Name: {
		type: String,
		trim: true,
		required: true
	},
	Email: {
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
		default: "Unspecified"
	},
	House: {
		type: String,
		trim: true,
		default: ""
	},
	City: {
		type: String,
		trim: true,
		default: ""
	},
	State: {
		type: String,
		trim: true,
		default: ""
	},
	Course: {
		type: String,
		trim: true,
		default: ""
	},
	Department: {
		type: String,
		trim: true,
		default: ""
	},
	Clubs: {
		type: Array,
		default: []
	},
	Phone: {
		type: String,
		trim: true,
		default: ""
	},
	Internship: {
		type: Array,
		default: []
	},
	Photo: {
		type: Buffer
	},
	Facebook: {
		type: String,
		trim: true,
		default: ""
	},
	format: {
		type: String,
		trim: true
	}
},
{
	timestamps: true
});

// StudentSchema.pre('find', (next) => {
// 	this._startTime = Date.now();
// 	next();
// });

// StudentSchema.post('find', (doc, next) => {
// 	this._queryTime = null;
// 	if (this._startTime) {
// 		this._queryTime = Date.now() - this._startTime;
// 	}
// 	console.log(`${this._queryTime/1000} second.`);
// 	next();
// });

StudentSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject({ virtuals: true });
	delete userObject["__v"];
	delete userObject["Email"];
	delete userObject["Sl"];
	delete userObject["Phone"];
	delete userObject["Clubs"];
	delete userObject["id"];
	delete userObject["Photo"];
	delete userObject["format"];
	return userObject;
}

module.exports = StudentSchema;