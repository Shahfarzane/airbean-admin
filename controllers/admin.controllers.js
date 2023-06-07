const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/admin.middleware");
const { User, Menu } = require("../models/dataModel");
const moment = require("moment");
const currentTime = moment().local().format("YYYY-MM-DD HH:mm:ss");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      email,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    const token = createToken(admin._id, admin.role);

    res.json({ message: "Admin successfully created", token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email });

    if (!admin || admin.role !== "admin") {
      return res.status(401).json({ error: "Access Denied! " });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Check your password" });
    }

    const token = createToken(admin._id, admin.role);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const create = async (req, res) => {
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
};

const createPromotion = async (req, res) => {
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
};

const update = async (req, res) => {
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
};

const remove = async (req, res) => {
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
};
module.exports = {
  signUp,
  login,
  create,
  createPromotion,
  update,
  remove
};
