const express = require("express");
const router = express.Router();
const { Menu } = require("../models/dataModel");

router.get("/api/beans", async (req, res) => {
  try {
    let menu = await Menu.find();
    if (menu.length === 0) {
      const data = require("../data/menu.json");
      menu = await Menu.insertMany(data);
    }

    res.json({ menu });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Menu items not found , check your connection." });
  }
});

module.exports = router;
