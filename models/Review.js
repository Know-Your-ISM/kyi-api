const mongoose = require ("mongoose");

const ReviewSchema = mongoose.Schema({
	user: {
		type: String,
        default: 0,
        trim: true
	},
	title: {
		type: String,
        default: 0,
        trim: true
	},
	content: {
		type: String,
        default: 0,
        trim: true
	},
	
});