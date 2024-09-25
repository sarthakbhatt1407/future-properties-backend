const express = require("express");
const router = express.Router();
const queryController = require("../controller/queryController");

router.post("/add-query", queryController.createNewQuery);
router.post("/get-query-by-userid", queryController.getQueryByUserId);
router.delete("/delete-query", queryController.deleteQuery);

module.exports = router;
