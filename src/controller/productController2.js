import { Product2 } from "../schema/model.js";


//create product data
export let createProduct = async (req, res) => {
  let productData = req.body;
  try {
    let result = await Product2.create(productData);
    res.status(200).json({
      success: true,
      message: "Product data created successfully.",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

//read all data
export let readAllProducts = async (req, res) => {

  let result = await Product2.find({});

  try {
    res.status(200).json({
      success: true,
      message: "Product data read(retrieve) successfully",
      result: result,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
export const searchByName = async (req, res) => {
  try {
    const userInput = req.params.productName; 
    // Query products with name similar to userInput
    const products = await Product2.find({ title: { $regex: userInput, $options: 'i' } });
    
    // Send response with the products
    res.status(200).json(products); // Sending the entire array of products
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: 'Error retrieving products' });
  }
};

//read by product id
export let readProduct = async (req, res) => {
  let productId = req.params.productId;

  try {
    let result = await Product2.findById(productId);
    res.status(200).json({
      success: true,
      message: "Product read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//update
export let updateProduct = async (req, res) => {
  let productId = req.params.productId;
  let updateData = req.body;
  try {
    let result = await Product2.findByIdAndUpdate(productId, updateData);
    res.status(201).json({
      success: true,
      message: "Product updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//delete
export let deleteProduct = async (req, res) => {
  let productId = req.params.productId;
  try {
    let result = await Product2.findByIdAndDenlete(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
