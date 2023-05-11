const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const FirstGridSchema = new Schema({
  Category: { type: String },
  Sub_Category: { type: String },
  ImageSource: { type: String },
});

const SecondGridSchema = new Schema({
  Category: { type: String },
  Sub_Category: { type: String },
  ImageSource: { type: String },
});

const ThirdGridSchema = new Schema({
  Category: { type: String },
  Sub_Category: { type: String },
  ImageSource: { type: String },
});

const homepage = new Schema({
    DateCreated:{type: Date},
    FirstGrid: [FirstGridSchema],
    SecondGrid: [SecondGridSchema],
    ThirdGrid: [ThirdGridSchema]
  });

// Create a new collection
const HomePage = new mongoose.model("HomePage", homepage);

module.exports = HomePage;
