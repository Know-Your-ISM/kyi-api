const express = require('express');

const router = express.Router();

router.get("", (req, res) => {res.status(404).send("You are in the middle of nowhere!")});
router.post("", (req, res) => {res.status(404).send("You are in the middle of nowhere!")});
router.patch("", (req, res) => {res.status(404).send("You are in the middle of nowhere!")});
router.delete("", (req, res) => {res.status(404).send("You are in the middle of nowhere!")});

module.exports = router;