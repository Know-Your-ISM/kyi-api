const shorts = require('../controllers/shorts');

const express = require ('express');

const router = express.Router();

router.post("/", shorts.createShort);

router.get("/", shorts.redirect);

module.exports = router;