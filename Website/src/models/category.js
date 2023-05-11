const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_name: {
      type: String,
      required: true,
      unique:true,
    },
    sub_category_list: {
      type: [String], // Change type to Array of Strings
      required: true,
    },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
