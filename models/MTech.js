const mongoose = require ('mongoose');

var StudentSchema = require ("./Student");

module.exports = mongoose.model("MTech", StudentSchema);