const express = require('express');

const search = require ("../controllers/search.js");

const router = express.Router();

router.get("", search.querySearch);

router.get("/:query", search.findByQuery);

module.exports = router;