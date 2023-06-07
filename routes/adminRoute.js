const express = require("express");
const router = express.Router();
const moment = require("moment");

const {
  inputCheck,
  adminAuthCheck
} = require("../middleware/admin.middleware");
const { Menu } = require("../models/dataModel");
const currentTime = moment().local().format("YYYY-MM-DD HH:mm:ss");

router.post(
  "/api/admin/create",
  inputCheck,
  adminAuthCheck,
  async (req, res) => {
    const { name, price, description } = req.body;
    try {
      const newMenuItem = new Menu({
        name: name,
        price: price,
        description: description,
        createdAt: currentTime
      });

      await newMenuItem.save();
      res.json(newMenuItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post("/api/admin/create/promotion", adminAuthCheck, async (req, res) => {
  const { promotionName, promotionItems, price, description } = req.body;

  try {
    const menuItems = await Menu.find({ name: { $in: promotionItems } });

    if (menuItems.length !== promotionItems.length) {
      const missingProducts = promotionItems.filter(
        (product) =>
          !menuItems.some((menuProduct) => menuProduct.name === product)
      );
      return res
        .status(400)
        .json({ error: `Invalid products: ${missingProducts}` });
    }

    const promotionMenu = new Menu({
      name: promotionName,
      price,
      description,
      createdAt: currentTime,

      promotion: [
        {
          isPromotion: true,
          promotionItems: menuItems.map((product) => product.name)
        }
      ]
    });

    await promotionMenu.save();

    res.json({ message: "Promotion menu created successfully", promotionMenu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put(
  "/api/admin/update/:id",
  adminAuthCheck,
  inputCheck,
  async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
      const itemToUpdate = await Menu.findOneAndUpdate(
        { _id: id },
        { $set: { name, price, description, modifiedAt: currentTime } },
        { new: true }
      );

      if (!itemToUpdate) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.json({
        message: "Product updated successfully",

        itemToUpdate
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete("/api/admin/delete/:id", adminAuthCheck, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Menu.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.deleteOne({ _id: id });

    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
