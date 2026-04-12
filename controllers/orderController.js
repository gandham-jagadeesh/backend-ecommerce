const customError = require("../utilites/appError");
const orderService = require("../services/orderService.js");
const { db } = require("../db/db.js");
const getOrders = async (req,res)=>{
    const user_id  = req.user.id;
    if(!user_id || typeof user_id != "string"){
        throw new customError(401,"unauthorized");
    }
    const data = await orderService.getOrders(user_id);
    return res.status(200).json({
        status:"success",
        data:data
    });
};

const  getOrderItem = async (req,res)=>{
 const user_id  = req.user.id;
 const order_item_id = req.params.order_item_id;
  if(!user_id || typeof user_id != "string"){
        throw new customError(401,"unauthorized");
    }
    if(!order_item_id || typeof order_item_id != "string"){
        throw new customError(400,"invalid order id");
    }
    const order = await orderService.getOrderItem(user_id,order_item_id);
    if(!order){
        throw new customError(404,"order item not found");
    }
    return res.status(200).json({
        status:"success",
        data:order
    })
};

module.exports = {
    getOrders,
    getOrderItem
}