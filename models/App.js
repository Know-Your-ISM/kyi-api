const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const AppSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    platform: {
        type: String,
        default: "x-platform",
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dev',
        required: true
    },
    key: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    superApp: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

// AppSchema.pre('save', async function (next) {
//     const app = this;
//     if (app.isNew) {
//         console.log('New app created.');
//         app.key = await bcrypt.hash(app.key, 8);
//     }
// });

/* AppSchema Methods */
AppSchema.methods.signKey = function () {
	const token = jwt.sign({ _id: this["_id"], name: this['name'] }, process.env.JWT_SECRET, {});
	try {
		this.key = token;
	}
	catch (err) {
		console.log(err);
	}
}

module.exports = mongoose.model('App', AppSchema);