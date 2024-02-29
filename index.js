import express, { json } from "express";
import connectToMongodb from "./src/connectToDb/connectToMongodb.js";


import productRouter2 from "./src/router/productRouter2.js";
import productRouter3 from "./src/router/productRouter3.js";


import webuserRouter from "./src/router/webuserRouter.js";
import cors from "cors";
import { port } from "./src/constant.js";
import productRouter1 from "./src/router/productRouter1.js";

let expressApp = express();
expressApp.use(json());
expressApp.use(express.static("./public"));
expressApp.use(cors());

expressApp.listen(port, () => {
  console.log(`Server is running in port number:${port}`);
});

connectToMongodb();

expressApp.use("/products1", productRouter1);
//expressApp.use("/products1/price-gte/:minPrice", productRouter1);
//expressApp.use("/products1/products-search-by-name/:productName",productRouter1);
//expressApp.use("/products2/products-search-by-name/:productName",productRouter2);
expressApp.use("/products2", productRouter2);
expressApp.use("/products3", productRouter3);
expressApp.use("/web-users", webuserRouter);
