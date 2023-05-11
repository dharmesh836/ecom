const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    login: {
      type: String,
      required: true,
     
    },
    password: {
      type: String, // Change type to Array of Strings
      required: true,
    },
});

const Login = mongoose.model("Category", loginSchema);

module.exports = Login;
