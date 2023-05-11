const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cartItem");
const Login = require("../models/seller/login");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


const Order = require("../models/pages/checkout/order");



const cartObj = {
    cartItemObjectArray : [],
    total :0
}
router.get("/", async (req, res) => {
    try {
        const cartItemObjectArray = [];
        const c = await Cart.find();
        let total=0;
        for(let i = 0; i<c.length;i++){
            const p = await Product.findOne({product_id:c[i].product_id});
            cartItemObjectArray.push({product:p, count:c[i].count, totalprice:p.price*c[i].count});
            total +=p.price*c[i].count;
        }
            cartObj.cartItemObjectArray = cartItemObjectArray,
            cartObj.total =total
        

        
        res.render("cart",{cartObj})
    } catch (error) {
        res.send(error)
       // res.render("cart",{cartItemObjectArray})
    }
    console.log("Cart")
})

const update = (id)=>{
    for(let i = 0; i<cartObj.cartItemObjectArray.length;i++){
        if(cartObj.cartItemObjectArray[i].product.product_id === id){
            cartObj.cartItemObjectArray.splice(i,1);
        }
    }
}

router.get("/remove-item", async (req, res) => {
    try {
        const q = await Cart.findOne({product_id:req.query.id});
        await Cart.findByIdAndDelete(q._id)
        await update(res.query.id)
        console.log(cartObj)
        res.render("cart",{cartObj})
    } catch (error) {
        res.send(error) 
    }
    console.log("Cart")
})
//////////////////////////////////////
// checkout

router.get("/check-out", async (req, res) => {
    try {
       
        res.render("checkout")
    } catch (error) {
        res.send(error) 
    }
    console.log("checkout")
})

router.post("/payment", async (req, res) => {
    try {
        

        const name = req.body.Name
        const Address = req.body.Address
        const City = req.body.City
        const Zipcode = req.body.Zip_code


        const items = []

        for(let i = 0; i<cartObj.cartItemObjectArray.length;i++){
            items.push({
                product_id:cartObj.cartItemObjectArray[i].product.product_id,
                count:cartObj.count,
                totalprice:cartObj.totalprice
            })
        }
            
        



        const newOrder = new Order({
            name: name,
            items: items,
            total: cartObj.total,
            shippingAddress: Address,
          });
        
          const savedOrder = await newOrder.save();

        console.log(newOrder)
        res.render("orderplaced");
    } catch (error) {
        res.send(error) 
    }
  
    console.log("checkout")
})

router.get('/payment',(req,res)=>{
    try {
        res.render("orderplaced");
    } catch (error) {
        
    }
})




module.exports = router;




