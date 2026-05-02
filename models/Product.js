import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      lowercase: true
    },
    brand: {
      type: String,
      default: "D&D"
    },
    description: {
      type: String,
      default: ""
    },
    countInStock: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Product", productSchema);