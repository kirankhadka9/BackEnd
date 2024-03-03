import { model } from "mongoose";

import productSchema1 from "./productSchema1.js";
import productSchema2 from "./productSchema2.js";
import productSchema3 from "./productSchema3.js";

import webuserSchema from "./webuserSchema.js";



export let WebUser = model("WebUser", webuserSchema);
export let Product1 = model("Product1", productSchema1);
export let Product2 = model("Product2", productSchema2);
export let Product3 = model("Product3", productSchema3);
