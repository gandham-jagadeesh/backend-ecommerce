const auth= require("../middleware/authMiddleware");
const cartItemService = require("../services/cartService");
const customError = require("../utilites/appError");
const router = require("express").Router();

router.use(auth);

const getCartItems = (req,res)=>{

}

//not good quanity limit should be in business logic not here uuid regex check 
const addCartItem = async (req,res)=>{
    const cartItem = req.body;
    const user_id  = req.user.id;
    if(!cartItem){
        throw new customError(400,"missing fields");
    }
    if(!user_id){
        throw new customError(401,"unAuthorized");
    }
    const { product_id , quantity } = cartItem;
    if( typeof product_id !== "string" ){
        throw new customError(400,"product_id must be uuid");
    }
    const parsedQuantity = Number(quantity);
    if(!Number.isInteger(parsedQuantity) || parsedQuantity <= 0){
        throw new customError(400,"invalid quantity");
    }
    const data = await cartItemService.addItem(product_id,parsedQuantity,user_id);
    return res.status(201).json({
        status:"success",
        data:data
    })
}
const updateCartItem = (req,res)=>{

} 

const deleteCartItem = (req,res)=>{

}

module.exports = {
    getCartItems,
    addCartItem,
    updateCartItem,
    deleteCartItem
}