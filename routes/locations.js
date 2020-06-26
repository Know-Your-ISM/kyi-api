const express = require ("express");

const locations = require("../controllers/locations");

const router = express.Router();

router.get("/college/", locations.fetchCollegeLoc);
router.get("/resturants", locations.fetchRestaurantLoc);
router.post("/college", locations.createLoc);
router.post("/restaurants", locations.createLoc);

router.get("/search/:query", locations.searchLoc);
router.get("/id/:id", locations.fetchById);

module.exports = router;