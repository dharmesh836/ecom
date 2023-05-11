const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cartItem");
const Login = require("../models/seller/login");

router.get("/", async (req, res) => {
  console.log("Product-description");
  try {
    const product_id = parseInt(req.query.id);
    const product = await Product.findOne({ product_id });

    res.render("product_description", product);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
});




router.get("/add-to-cart",async(req, res) => {
  try {
    
    const product_id = parseInt(req.query.id);
    const itemPresent = await Cart.findOne({ product_id });
    const p = await Product.findOne({product_id});
    const item =  new Cart({
      product_id: req.query.id,
      count: 1,
      totalprice:p.price
    });

    if(itemPresent === null){
      console.log("Item was not present\nIt id Added now")
      const insertedItem =  await item.save();
    }
    else{
      console.log("Item is allready present");
      const value  = itemPresent.count;
      await Cart.findByIdAndDelete({_id:itemPresent._id});
      item.count = itemPresent.count + 1;
      const insertedItem =  await item.save();
      console.log("Updated");
    }


    
    const product = await Product.findOne({ product_id });

    res.render("product_description", product);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

module.exports = router;
