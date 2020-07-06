const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    propertyType: {
        type: String,
        trim: true,
        default: "Restaurant"
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    coordinates: {
        latitude: {
            type: String,
            default: "",
            trim: true
        },
        longitude: {
            type: String,
            default: "",
            trim: true
        },
        plusID: {
            type: String,
            default: "",
            trim: true
        }
    },
    photo: {
        big: {
            type: String,
            default: "",
            trim: true
        },
        medium: {
            type: String,
            default: "",
            trim: true
        },
        small: {
            type: String,
            default: "",
            trim: true
        },
        thumb: {
            type: String,
            default: "",
            trim: true
        }
    },
    rating: {
        ambience: {
            type: Number,
            default: 0,
            trim: true
        },
        service: {
            type: Number,
            default: 0,
            trim: true
        },
        food: {
            type: Number,
            default: 0,
            trim: true
        }
    },
    costs: {
        rickshaw: {
            type: Number,
            default: 0,
            trim: true
        },
        spending: {
            for2: {
                type: Number,
                default: 0,
                trim: true
            },
            for4: {
                type: Number,
                default: 0,
                trim: true
            },
            for6: {
                type: Number,
                default: 0,
                trim: true
            }
        }
    },
    events: { // Mention if you can actually organise any event here.
              // Are halls available?
        type: String,
        default: "Not Available",
        trim: true
    },
    alcohol: {
        type: String,
        default: "",
        trim: true
    }
},
{
    timestamps: true
});

RestaurantSchema.methods.toJSON = function () {
    const location = this;
    const locObject = location.toObject({ virtuals: true });
    delete locObject.createdAt;
    delete locObject.updatedAt;
    delete locObject.__v;
    delete locObject.id;
    return locObject;
}

module.exports = mongoose.model('Restaurant', RestaurantSchema);