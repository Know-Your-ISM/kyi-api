const express = require('express');

const router = express.Router();

router.get("", (req, res) => {res.send("You are in the middle of nowhere!")});
router.post("", (req, res) => {res.send("You are in the middle of nowhere!")});
router.patch("", (req, res) => {res.send("You are in the middle of nowhere!")});
router.delete("", (req, res) => {res.send("You are in the middle of nowhere!")});

module.exports = router;