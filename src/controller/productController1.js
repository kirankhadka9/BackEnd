import { Product1 } from "../schema/model.js";


//create product data
export let createProduct = async (req, res) => {
    let productData = req.body;
    try {
      let result = await Product1.create(productData);
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
  
    let result = await Product1.find({});
  
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
      const products = await Product1.find({ title: { $regex: userInput, $options: 'i' } });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error retrieving products' });
    }
  };
  
  export const createIndex= async (req, res) => {
    try {
      const userInput = req.params.productName;
      const maxPrice = parseInt(req.query.maxPrice);
  
      if (isNaN(maxPrice) || maxPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid maxPrice parameter",
        });
      }
  
      const products = await Product1.find({
        title: { $regex: userInput, $options: 'i' },
        price: { $lte: maxPrice }
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error retrieving products' });
    }
  };
  
  



  // export const searchByMin = async (req, res) => {
  //   try {
    
  //     const minPrice = parseInt(req.params.minPrice, 10);
      
    // Check if minPrice is a valid number
  //     if (isNaN(minPrice)) {
  //       return res.status(400).json({ success: false, message: 'Invalid minPrice' });
  //     }
  
     // Query products with price greater than or equal to minPrice
  //     const products = await Product1.find({ price: { $gte: minPrice } });
      // Send response with the products
  //     res.status(200).json(products);
  //   } catch (error) {
     // Handle errors
  //     console.error(error);
  //     res.status(500).json({ success: false, message: 'Server Error' });
  //   }
  // };
  
   ///

  
  //read by product id
  export let readProduct = async (req, res) => {
    let productId = req.params.productId;
  
    try {
      let result = await Product1.findById(productId);
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
      let result = await Product1.findByIdAndUpdate(productId, updateData);
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
      let result = await Product1.findByIdAndDelete(productId);
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
  