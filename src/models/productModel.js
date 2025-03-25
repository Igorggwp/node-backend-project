import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, },
  name: { type: String, required: true, },
  description: { type: String, required: true, },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true, },
  creationDate: { type: Date, default: Date.now, },
}, {
  versionKey: false,
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
