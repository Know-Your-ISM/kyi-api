const mongoose = require ('mongoose');

var StudentSchema = require ("./Student");

module.exports = mongoose.model("BTech", StudentSchema);