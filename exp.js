const express = require ('express');

const students = require("./routes/students");
const search = require ("./routes/search");
const home = require ("./routes/home");
const notFound = require ("./routes/404");

const exp = express();

require ("./db/mongoose");

exp.use(function (req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "Authorization, Accept, Content-Type, Origin, X-Requested-With");
	next();
});

exp.use(express.json());
exp.use(express.urlencoded({ extended: true }));

exp.use("/", home);
exp.use("/search", search);
exp.use("/students", students);

exp.use(notFound);

module.exports = exp;