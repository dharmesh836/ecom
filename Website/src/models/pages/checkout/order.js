const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type:String,
    //required: true
  },
  items: [
    {
        product_id: {
        type: Number,
       // required: true
      },
      count: {
        type: Number,
        //required: true
      },
      totalprice:{
        type: Number,
       // required: true
      }
    }
  ],
  total: {
    type: Number,
//required: true
  },
  shippingAddress: {
    type: String,
   // required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending'
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
