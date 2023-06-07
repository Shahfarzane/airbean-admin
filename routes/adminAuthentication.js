const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/admin.middleware");
const { authValidation } = require("../middleware/validation");

const { User } = require("../models/dataModel");

router.post("/api/admin/signup", authValidation, async (req, res) => {
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
});

router.post("/api/admin/login", async (req, res) => {
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
});

module.exports = router;
