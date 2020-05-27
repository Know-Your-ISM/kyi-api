const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {res.send(`This is the homepage of __v: 1.0.1 of the data-api of the KYI project.`)});
router.post("/", (req, res) => {res.send(`This is the homepage of __v: 1.0.1 of the data-api of the KYI project.`)});
router.patch("/", (req, res) => {res.send(`This is the homepage of __v: 1.0.1 of the data-api of the KYI project.`)});
router.delete("/", (req, res) => {res.send(`This is the homepage of __v: 1.0.1 of the data-api of the KYI project.`)});

module.exports = router;