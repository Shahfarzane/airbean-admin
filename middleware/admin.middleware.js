const jwt = require("jsonwebtoken");
const { User } = require("../models/dataModel");

const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.API_KEY || "hereIsA-Very-LOng-Key-2234";

const createToken = (userId, role) => {
  const payload = { userId, role };
  const token = jwt.sign(payload, apiKey, { expiresIn: "7d" });
  return token;
};

const adminAuthCheck = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ error: "Access Denied. No token provided." });
    }

    const decoded = jwt.verify(token.split(" ")[1], apiKey);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== "admin") {
      return res.status(400).send("Token is not valid");
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const inputCheck = (req, res, next) => {
  const { price, name, description } = req.body;

  if (!price || !name || !description) {
    return res
      .status(400)
      .json({ error: "price,name,description are required" });
  }

  next();
};

module.exports = {
  inputCheck,
  createToken,
  adminAuthCheck
};
