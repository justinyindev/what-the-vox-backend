const express = require("express");
const headlineController = require("./../controllers/headlineController");

const router = express.Router();

router.get("/headline", headlineController.getHeadlines);

router.get("/summarize", headlineController.getSummary);

module.exports = router;
