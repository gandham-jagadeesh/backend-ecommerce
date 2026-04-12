const cartItemService = require("../services/cartService");
const customError = require("../utilites/appError");

const getCartItems = async (req,res)=>{
    const user_id = req.user.id;
    const items = await cartItemService.getAllItems(user_id);
    return res.status(200).json({
        status:"success",
        data:items
    });
}


const addCartItem = async (req,res)=>{
    const cartItem = req.body;
    const user_id  = req.user.id;
    if(!cartItem || cartItem === undefined){
        throw new customError(400,"missing fields");
    }
    const { product_id , quantity } = cartItem;
    if(!product_id || typeof product_id !== "string" ){
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

const updateCartItem = async (req,res)=>{
    const cid   = req.params.cart_item_id;
    const cart  =  req.body;
    const user_id = req.user.id;
    if(!cid){
        throw new customError(400,"cart_item_id is missing");
    }
    if(!cart){
        throw new customError(400," required update fields are missing");
    }
    const {quantity} = cart;
    const parsedQuantity = Number(quantity);
    if( !Number.isFinite(parsedQuantity) || parsedQuantity < -1000 || parsedQuantity >  1_000_000 || parsedQuantity === 0){
        throw new customError(400,"invalid quantity : either two high or too low");
    }
    const data = await cartItemService.updateItem(cid,parsedQuantity,user_id);
    return res.status(200).json({
        status:"success",
        data:data
    });
}

const deleteCartItem = async (req,res)=>{
    const user_id = req.user.id
    const cart_item_id = req.params.cart_item_id;
    if(!cart_item_id){
        throw new customError(400,"cart_item_id is missing");
    }
    const data = await cartItemService.deletItem(cart_item_id,user_id);
    return res.status(200).json({
        status:"success",
        data:data
    })
}

const getCartItem = async (req,res)=>{
 const user_id = req.user.id
    const cart_item_id = req.params.cart_item_id;
    if(!cart_item_id){
        throw new customError(400,"cart_item_id is missing");
    }
    const data = await cartItemService.getItem(cart_item_id,user_id);
    return res.status(200).json({
        status:"success",
        data:data
    })

}

module.exports = {
    getCartItems,
    addCartItem,
    updateCartItem,
    deleteCartItem,
    getCartItem
}