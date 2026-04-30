import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  name: String,
  phone: String,
  address: String,

  products: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number
    }
  ],

  totalAmount: Number,

  paymentId: String,
  orderId: String,

  status: {
    type: String,
    default: "Processing"
  },

  deliveryStatus: {
    type: String,
    default: "Not Shipped"
  },

  paymentStatus: {
    type: String,
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);  