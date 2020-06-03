const express = require ('express');

const appAuth = require ('../middleware/auth/app');
// const devAuth = require ('../middleware/auth/dev');
const dev = require ("../controllers/dev");

const router = express.Router();

router.get('/:id', dev.getOne);
router.post('/', appAuth.auth, dev.createOne);

module.exports = router;