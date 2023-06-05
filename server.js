const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const menuRoute = require("./routes/menuRoute.js");
const userAuthenticationRoute = require("./routes/userAuthenticationRoute.js");
const orderRoute = require("./routes/ordersRoute.js");
const userHistoryRoute = require("./routes/userHistoryRoute.js");
app.use(menuRoute, userAuthenticationRoute, orderRoute, userHistoryRoute);

const PORT = process.env.PORT || 5000;

const run = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://shahin:admin1@airbean.vqcypx2.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("Connected to database!!!");
      });
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

run();
