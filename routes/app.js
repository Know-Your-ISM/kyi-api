const express = require ('express');

const appAuth = require ('../middleware/auth/app');
// const devAuth = require ('../middleware/auth/dev');
const app = require ("../controllers/app");

const router = express.Router();

router.get('/', appAuth.auth, app.getOne);
router.post('/', appAuth.auth, app.createOne);

module.exports = router;