const productService = require("../services/productService");

const getProduct = async (req,res)=>{
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
    getAllProducts,
    getProduct
}