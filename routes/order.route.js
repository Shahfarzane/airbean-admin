const express = require("express");
const router = express.Router();

const {
  userOrderValidation,
  orderPropertyValidation
} = require("../middleware/validation");

const { createOrder } = require("../controllers/order.controller");

router.post(
  "/api/beans/orders",
  userOrderValidation,
  orderPropertyValidation,
  createOrder
);

module.exports = router;
