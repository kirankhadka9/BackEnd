import { Router } from "express";
import { createProduct, deleteProduct, readAllProducts, readProduct, updateProduct } from "../controller/productController3.js";



let productRouter3 =Router();

productRouter3.route("/")
.post(createProduct)
.get(readAllProducts)

productRouter3
.route('/:productId')
.get(readProduct)
.patch(updateProduct)
.delete(deleteProduct);

export default productRouter3;