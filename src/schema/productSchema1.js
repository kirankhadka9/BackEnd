import { Schema } from "mongoose";

let productSchema1 = Schema({
  productId: {
    type: String,
    required: [true, "productId is required."]
  },
  title: {
    type: String,
    required: [true, "title is required."]
  },
  description: {
    type: String,
    required: [true, "description is required."]
  },
  price: {
    type: Number,
    required: [true, "price is required."]
  },
  images: {
    type: [String], 
    required: [true, "images are required."]
  }
});

export default productSchema1;