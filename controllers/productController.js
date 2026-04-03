const {db,pg} = require("../db/db");
const productService = require("../services/productService");
const customError = require("../utilites/appError");

const addProduct = async (req,res)=>{
    const product = req.body;
    if(!product){
        throw new customError(400,"Missing fields");
    }
    const data = await productService.addProduct(product);
    res.status(201).json({
        status:"success",
        data:data
    });
}

const updateProduct = async (req,res)=>{
  const product_id = req.params.product_id;
  const product  =  req.body;
  if(!productId || !product){
    throw new customError(400,"Missing fields");
  }
  const data = await productService.updateProduct(product_id,product);
  res.status(201).json({
    status:"success",
    data:data
  })
}


const deletedProduct = async (req, res)=>{
    const product_id = req.params.product_id;
    if(!product_id){
        throw new customError(400,"missing product_id field");
    }
    const data = await productService.deleteProduct(product_id);
    return res.status(200).json({
        status:"success",
        data: data
    })
}


const getproduct = async (req,res)=>{
    const product_id = req.params.product_id;
      if(!product_id){
        throw new customError(400,"missing product_id field");
    }
    const product  = await productService.getProduct(product_id);
    return res.status(200).json({
        status:"success",
        data:product
    });
}


const getAllProducts = async (req,res)=>{
    try{
        const allproducts = await productService.getAllProducts();
        return res.status(200).json({
            status:"success",
            data:allproducts
        });
    }
    catch(e){
        throw e;
    }
}


module.exports = {
    addProduct,
    updateProduct,
    deletedProduct,
    getproduct,
    getAllProducts
}