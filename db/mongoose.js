const mongoose = require('mongoose');

const dbHost = "mongodb://127.0.01:27017/";
const dbName = "kyi";
const dbUrlDev = dbHost + dbName;

try {
	mongoose.connect(process.env.MONGODB_URL || dbUrlDev,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	});
}
catch (e) {
	console.log(e);
}

module.exports = mongoose;