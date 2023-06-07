const { Menu } = require("../models/dataModel");

const getMenu = async (req, res) => {
  try {
    let menu = await Menu.find();
    if (menu.length === 0) {
      const data = require("../data/menu.json");
      menu = await Menu.insertMany(data);
    }

    res.json({ menu });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMenu
};
