const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');

var DevSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		// required: true
	},
	email: {
		type: String,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
		unique: true,
		lowercase: true,
		default: "",
		trim: true,
		required: true
	},
	password: {
		type: String,
		validate (value) {
			if (value.length < 6) {throw new Error ("Password should be at least 6 characters long.");}
			if (value.toLowerCase().includes("password")) {throw new Error ("You are using an insecure password.");}
		},
		trim: true
	},
	avatar: {
		type: Buffer
	},
	format: {
		type: String
	},
	superUser: {
		type: Boolean,
		default: false
    }
},
{
	timestamps: true
});

/* DevSchema Pre */

DevSchema.pre("save", async function (next) {
	const dev = this;
	if (dev.isModified("password")) {
		dev.password = await bcrypt.hash(dev.password, 8);
    }
	next();
});

/* DevSchema Vitual Attributes */
DevSchema.virtual('apps', {
    ref: 'App',
    localField: '_id',
    foreignField: 'owner',
    justOne: false,
    options: { sort: { name: 1 } }
});

/* DevSchema Methods */
DevSchema.methods.toJSON = function () {
	const dev = this;
	const devObject = dev.toObject({ virtuals: true });
	delete devObject["__v"];
	delete devObject.avatar;
    delete devObject.format;
    delete devObject.superUser;
	return devObject;
}

module.exports = mongoose.model("Dev", DevSchema);