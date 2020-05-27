const express = require('express');

const students = require ("../controllers/students.js");

const router = express.Router();

router.get("/", students.getAll);

router.get("/:id", students.getOne);

router.post("/", students.create);

module.exports = router;