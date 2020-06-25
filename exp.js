const express = require ('express');

const students = require("./routes/student");
const search = require ("./routes/search");
const home = require ("./routes/home");
const notFound = require ("./routes/404");
const app = require ("./routes/app");
const dev = require ("./routes/dev");

const exp = express();
const allowed_origins = ['null', 'https://kyism.ga'];

require ("./db/mongoose");

exp.use('/views', express.static('views'));

exp.use(function (req, res, next){
	// let index = allowed_origins.findIndex(origin => {
	// 	return req.headers.origin == origin ? true : false;
	// });
	// if (index === -1) index = 0;
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, ");
	res.header("Access-Control-Allow-Headers", "Authorization, Accept, Content-Type, Origin, X-Requested-With");
	next();
});

exp.use(express.json());
exp.use(express.urlencoded({ extended: true }));

// exp.get("/", (req, res) => {
// 	res.sendFile(__dirname + "/views/index.html");
// });
exp.use("/api", home);
exp.use("/api/search", search);
exp.use("/api/students", students);
exp.use("/api/app", app);
exp.use("/api/dev", dev);

exp.use(notFound);

module.exports = exp;