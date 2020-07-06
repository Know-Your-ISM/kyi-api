const express = require("express");

const college = require("../controllers/college");
const restaurants = require("../controllers/restaurants");

const router = express.Router();

// College locations
// College get
router.get("/college", college.fetchAll);
router.get("/college/:id", college.fetchById);
router.get("/college/search/:query", college.searchLoc);

// College post
router.post("/college", college.createLoc);

// College patch
router.patch("/college/:id", college.updateById);

// Restaurant locations
// Restaurant get
router.get("/restaurant", restaurants.fetchAll);
router.get("/restaurant/:id", restaurants.fetchById);
router.get("/restaurant/search/:query", restaurants.searchRestaurant);

// Restaurant post
router.post("/restaurant", restaurants.createRestaurant);

// Restaurant patch
router.patch("/restaurant/:id", restaurants.updateById);

// Restaurant delete
router.delete("/restaurant/:id", restaurants.deleteById);

module.exports = router;