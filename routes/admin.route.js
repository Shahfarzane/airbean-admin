const express = require("express");
const router = express.Router();
const {
  inputCheck,
  adminAuthCheck
} = require("../middleware/admin.middleware");

const { authValidation } = require("../middleware/validation");

const {
  signUp,
  login,
  create,
  createPromotion,
  update,
  remove
} = require("../controllers/admin.controller");

router.post("/api/admin/signup", authValidation, signUp);
router.post("/api/admin/login", authValidation, login);

router.post("/api/admin/create", inputCheck, adminAuthCheck, create);
router.post("/api/admin/create/promotion", adminAuthCheck, createPromotion);
router.put("/api/admin/update/:id", adminAuthCheck, inputCheck, update);
router.delete("/api/admin/remove/:id", adminAuthCheck, remove);

module.exports = router;
