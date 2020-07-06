const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const { shortenURL } = require('../middleware/utils/encoders');

const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;

const URLSchema = mongoose.Schema({
    origin: {
        type: String,
        trim: true,
        default: 'https://kyism.ga/shorts/'
    },
    target: {
        type: String,
        trim: true,
        match: urlRegex,
        required: true
    },
    mirror: {
        type: String,
        trim: true
    },
    shortURL: {
        type: String,
        trim: true
    },
    expires: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

URLSchema.pre('save', async function (next) {
    const url = this;
    if (url.isNew) {
        console.log('New url created.');
        url.mirror = await shortenURL(url.target, 9);
        url.mirror = url.mirror.slice(url.mirror.length - 9);
        url.shortURL = "kyism.gq/" + url.mirror;
    }
    next();
});

/* AppSchema Methods */
// AppSchema.methods.signKey = function () {
// 	const token = jwt.sign({ _id: this["_id"], name: this['name'] }, process.env.JWT_SECRET, {});
// 	try {
// 		this.key = token;
// 	}
// 	catch (err) {
// 		console.log(err);
// 	}
// }

module.exports = mongoose.model('ShortURL', URLSchema);