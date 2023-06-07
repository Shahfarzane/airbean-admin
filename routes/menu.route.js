const express = require("express");
const router = express.Router();

const { getMenu } = require("../controllers/menu.controller");

router.get("/api/beans", getMenu);

module.exports = router;
