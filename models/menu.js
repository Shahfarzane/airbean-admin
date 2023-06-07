const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: String
  },
  modifiedAt: {
    type: String
  },
  promotion: [
    {
      isPromotion: {
        type: Boolean,
        default: false
      },
      promotionItems: {
        type: [String],
        default: []
      }
    }
  ]
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
