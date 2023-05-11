
const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Login = require("../models/seller/login");
const Collection = require("../models/pages/homepage/collection");




class HomePage {
    constructor(collections) {
      this.collections = collections;
    }
  }



// const HomePageObject = {
//     current_offer1:{  
        
//     },

//     current_offer2:{

//     },

//     collections = [{
//         imageUrl: "www.img.com",
//         category: "Electronics",
//         sub_category:"Camera"
//     },{
//         imageUrl: "www.img.com",
//         category: "Electronics",
//         sub_category:"Camera"
//     }
//     ]
// }
   


router.get("/", async (req, res) => {
    console.log("Home Page")
    try {
        const collection = await Collection.find();
        const HomePageObject = new HomePage(collection);
        console.log(collection)
        res.render("home", HomePageObject)
    } catch (e) {
      res.status(400).send(e)
    }
});
  


module.exports = router;


