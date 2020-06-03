const express = require('express');

const students = require ("../controllers/students.js");
const auth = require ("../middleware/auth/app");

const router = express.Router();

router.get("/", auth.auth, students.getAll);

router.get("/:id", auth.auth, students.getOne);

router.post("/", auth.auth, students.create);

module.exports = router;