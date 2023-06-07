const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());

// const menuRoute = require("./routes/menuRoute.js");
// const userAuthenticationRoute = require("./routes/userAuthenticationRoute.js");
// const orderRoute = require("./routes/ordersRoute.js");
// const userHistoryRoute = require("./routes/userHistoryRoute.js");
// const adminRoute = require("./routes/adminRoute.js");
// const adminAuth = require("./routes/adminAuthentication.js");

const adminRoutes = require("./routes/admin.route");
app.use(adminRoutes);

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
