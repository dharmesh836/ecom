const mongoose = require("mongoose");
const validator = require("validator");

const productCategory = new mongoose.Schema({
    category_id :{
        type:Number,
        required:true,
        unique:true
    },
    category_name:{
        type: String,
        required:true,
    }
})


// Create a new collection
const ProductCategory = new mongoose.model("ProductCategory",productCategory);

module.exports =  ProductCategory;