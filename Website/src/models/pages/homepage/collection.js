const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const sub_category = new Schema({
    SubCategoryName: {type: String},
    ImageSource: {type:String}
  });
  

const collection = new Schema({
  Category: {type: String},
  SubCategory: [sub_category]
});

// Create a new collection
const Collection = new mongoose.model("Collection", collection);

module.exports = Collection;
