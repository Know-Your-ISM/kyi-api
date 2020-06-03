const express = require('express');

const search = require ("../controllers/search.js");
const auth = require ('../middleware/auth/app');

const router = express.Router();

router.get("", auth.auth, search.querySearch);

router.get("/:query", auth.auth, search.findByQuery);

module.exports = router;