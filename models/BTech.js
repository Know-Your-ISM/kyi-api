const mongoose = require ('mongoose');

var StudentSchema = require ("./Student");

StudentSchema.course = {
    type: String,
    default: "BTech",
    trim: true
};

// StudentSchema.index({ Name: 1, Sex: 1, Place: 1, Branch: 1 });

module.exports = mongoose.model("BTech", StudentSchema);