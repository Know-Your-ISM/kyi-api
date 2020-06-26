const express = require ("express");

const locations = require("../controllers/locations");

const router = express.Router();

router.get("/college/", locations.fetchCollegeLoc);
router.get("/restaurant", locations.fetchRestaurantLoc);
router.post("/college", locations.createLoc);
router.post("/restaurant", locations.createLoc);

router.get("/search/:query", locations.searchLoc);
router.get("/id/:id", locations.fetchById);

module.exports = router;