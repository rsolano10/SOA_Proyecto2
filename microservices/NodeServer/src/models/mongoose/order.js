const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const OrderSchema = new Schema({
  userName: String,
  products: [{
    code: Number,
    name: String,
    price: Number,
    quantity: Number
  }],
  date: Date,
  total: Number
});


module.exports = Mongoose.model("Order", OrderSchema);
