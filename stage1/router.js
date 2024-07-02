
const express = require("express");
const { greeting } = require("./controller");
const router = express.Router();

router.get("/hello", greeting);

module.exports = router;