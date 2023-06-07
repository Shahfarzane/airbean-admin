const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());

const menuRoutes = require("./routes/menu.route");
const adminRoutes = require("./routes/admin.route");
const userRoutes = require("./routes/users.route");
const orderRoutes = require("./routes/order.route");

app.use(adminRoutes, menuRoutes, userRoutes, orderRoutes);

const PORT = process.env.PORT || 5000;

const run = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => {
      console.log("Connected to database!!!");
    });
  } catch (error) {
    console.log(error);
  }
};

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

run();
