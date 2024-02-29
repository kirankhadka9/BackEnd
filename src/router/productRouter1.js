import { Router } from "express";
import { createProduct, deleteProduct, readAllProducts, readProduct, searchByName, updateProduct } from "../controller/productController1.js";

let productRouter1 = Router();

productRouter1.route("/")
  .post(createProduct)
  .get(readAllProducts);

// productRouter1.route("/price-gte/:minPrice") 
//   .get(searchByMin);
productRouter1.route("/products-search-by-name/:productName")
.get(searchByName);



productRouter1.route('/:productId')
  .get(readProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productRouter1;
