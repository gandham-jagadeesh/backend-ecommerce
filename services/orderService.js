const db = require("../db/db").db;
const  getOrders = async (user_id)=>{
    const orders = await db.manyOrNone("select * from orders where user_id = $1",[user_id]);
    return orders;
};

const  getOrderItem = async (user_id,order_id)=>{
    const getSpeficiOrder = await db.oneOrNone("select oi.*  from order_items oi join orders  o  on  o.order_id = oi.order_id where o.user_id = $1 and oi.order_item_id = $2",[user_id,order_id]);
    return getSpeficiOrder;
};

module.exports = {
    getOrders,
    getOrderItem
}