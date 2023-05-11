/// /seller_login

const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Login = require("../models/seller/login");

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Product form creation data
const product = {
  Route:"add_product",
  Field_name: [
    "Product_ID",
    "Product_Name",
    "Brand",
    "Price",
    "Description",
    "Image_url",
    "Category",
    "Sub_Category",
  ],
  Button1:"Add Product",
  Button2:"Reset"
};

const login = {
  Route:"login",
  Field_name: [
    "Email", "Password",
  ],
  Button1:"Login",
  Button2:"Forgot Password"
}

const category = {
  Route:"add_category",
  Field_name: [
    "Category_Name", "Sub_Category_Name",
  ],
  Button1:"Add Category",
  Button2:"Reset"
}




router.get("/", async (req, res) => {
  console.log("seller_login/login");
  try {
    res.render("seller/seller_login");
  } catch (err) {}
});

router.get("/signin", async (req, res) => {
  console.log("seller_login/signin");
  try {
    res.render("seller/signin");
  } catch (err) {}
});





// 
router.get("/add_product", async (req, res) => {
  console.log("add_product");
  try {
    res.render("seller/add_product");
  } catch (err) {}
});

// 
router.get("/add_category", async (req, res) => {
  console.log("add_category");
  try {
    res.render("seller/create/addings", category);
  } catch (err) {}
});


// Creating A login 
router.post("/login", async (req, res) => {
  console.log("login Post method called");
  try {
    const loggedin = new Login({
      login: req.body.Email,
      password: req.body.Password,
    });

    const success = await loggedin.save();
    console.log("Loged in successfully" + success);
    res.render("seller/create/addings", login);
  } catch (err){
    res.status(400).send(err)
  }
});


// creating a product.
router.post("/add-product", async (req, res) => {
  console.log("add-product");
  try {
    const products = new Product({
      product_id: req.body.product_id,
      product_name: req.body.product_name,
      brand: req.body.brand,
      price: req.body.price,
      description: req.body.description,
      image_url: req.body.image_url,
      category: req.body.category,
      sub_category_id: req.body.sub_category,
    });

    const success = await products.save();
    console.log("Product added successfully" + success);
    res.render("seller/productaddedsuccesfully");
  } catch (err){
    res.status(400).send(err)
  }
});





/// test link

router.get("/test", async (req, res) => {
  console.log("add_category");
  try {
    res.render("test/test");
  } catch (err) {}
});


router.post("/test", async (req, res) => {
  console.log("test login Post method called");
  try {
    const loggedin = new Login({
      login: req.body.Email,
      password: req.body.Password,
    });

    const success = await loggedin.save();
    console.log("Loged in successfully" + success);
    res.render("seller/create/addings", login);
  } catch (err){
    console.log(err)
    res.status(400).send(err)
  }
});

module.exports = router;