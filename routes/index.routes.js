const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("Nothing to see here except this test sentence.");
});

module.exports = router;
