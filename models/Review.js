const mongoose = require ("mongoose");

const ReviewSchema = mongoose.Schema({
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BTech',
		required: true
	},
	title: {
		type: String,
        default: "Untitled Review.",
		trim: true,
	},
	content: {
		type: String,
        default: "",
        trim: true
	},
	favourite: {
		type: String,
        default: "",
        trim: true
	},
	restaurant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Restaurant',
		required: true
	},
	rating: {
		ambience: {
			type: Number,
			default: 0,
		},
		service: {
			type: Number,
			default: 0
		},
		food: {
			type: Number,
			default: 0
		}
	}
},
{
	timestamps: false
});

ReviewSchema.methods.toJSON = function () {
    const location = this;
    const locObject = location.toObject({ virtuals: true });
    delete locObject.createdAt;
    delete locObject.updatedAt;
    delete locObject.__v;
    delete locObject.id;
    return locObject;
}

module.exports = mongoose.model('Review', ReviewSchema);