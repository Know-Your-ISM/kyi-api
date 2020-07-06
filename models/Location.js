const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    propertyType: {
        type: String,
        trim: true,
        default: "Institute Owned"
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
            default: "https://i.imgur.com/AxHyhawh.png",
            trim: true
        },
        medium: {
            type: String,
            default: "https://i.imgur.com/AxHyhawl.png",
            trim: true
        },
        small: {
            type: String,
            default: "https://i.imgur.com/AxHyhawm.png",
            trim: true
        },
        thumb: {
            type: String,
            default: "https://i.imgur.com/AxHyhawt.png",
            trim: true
        }
    },
    rating: {
        type: String,
        default: 0,
        trim: true
    },
    costs: {
        rickshaw: {
            type: String,
            default: 0,
            trim: true
        },
        spending: {
            type: String,
            default: 0,
            trim: true
        }
    }
},
{
    timestamps: true
});

LocationSchema.methods.toJSON = function () {
    const location = this;
    const locObject = location.toObject({ virtuals: true });
    delete locObject.createdAt;
    delete locObject.updatedAt;
    delete locObject.__v;
    delete locObject.id;
    return locObject;
}

module.exports = mongoose.model("Location", LocationSchema);