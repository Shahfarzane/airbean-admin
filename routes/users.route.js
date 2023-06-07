const express = require("express");
const router = express.Router();
const { authValidation, checkId } = require("../middleware/validation");

const {
  userSignup,
  userSignIn,
  orderHistory,
  orderStatus
} = require("../controllers/users.controller");

router.post("/api/user/signup", authValidation, userSignup);
router.post("/api/user/login", authValidation, userSignIn);

router.get("/api/user/:id/history", checkId, orderHistory);
router.get("/api/user/status/:id", checkId, orderStatus);

module.exports = router;
