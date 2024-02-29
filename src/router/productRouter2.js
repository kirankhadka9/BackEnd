import { Router } from "express";
import { createProduct, deleteProduct, readAllProducts, readProduct, searchByName, updateProduct } from "../controller/productController2.js";


let productRouter2 =Router();

productRouter2.route("/")
.post(createProduct)
.get(readAllProducts)

productRouter2.route("/products-search-by-name/:productName")
.get(searchByName);

productRouter2
.route('/:productId')
.get(readProduct)
.patch(updateProduct)
.delete(deleteProduct);

export default productRouter2;