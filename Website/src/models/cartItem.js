const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  totalprice:{
    type: Number,
    //required: true,
  }
});

const Cart = mongoose.model("Cartitems", cartSchema);

module.exports = Cart;
