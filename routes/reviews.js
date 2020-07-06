const express = require("express");
const reviews = require("../controllers/reviews");
const router = express.Router();

router.get("/:id", reviews.getById);
router.get("/", reviews.getByFilters);
// router.get("/search/:query", reviews.search);

router.post("/", reviews.createReview);

router.patch("/:id", reviews.updateReview);

router.delete("/:id", reviews.deleteReview);

module.exports = router;