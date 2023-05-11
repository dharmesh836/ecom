const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review_id: { type: Number, required: true },
  reviewer_name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  product_id: { type: Number, required: true },
  product_name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image_url: {
    img1: { type: String, required: true },
    img2: { type: String },
    img3: { type: String }
  },
  category: { type: String, required: true },
  sub_category: { type: String, required: true },
  reviews: {
    total_reviews: { type: Number  },
    average_rating: { type: Number },
    reviews_list: [reviewSchema]
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
