const customError = require("../utilites/appError");

const db = require("../db/db").db;

const checkout  = async (user_id)=>{
    const updateQuery = "update products set quantity = quantity - $1 where product_id = $2 returning *";
    const order_details = await  t.tx(async (t)=>{
        const products = await t.manyOrNone("select ci.quantity as quantity_wanted  , p.price as price , p.quantity as stock  ,p.product_name as product_name , p.product_id as product_id ,  c.cart_id as cart_id from cartitems ci join carts  c on c.cart_id = ci.cart_id join products p  on p.product_id = ci.product_id where c.user_id =$1 for update",[user_id])
        if(!products || products.length === 0){
            throw new customElements(404,"not items to checkout");
        }
        let total = 0;
        let arr = [];
        for(let prod of products){
            if(prod.quantity_wanted <= prod.stock){
                const updatedData = await t.one(updateQuery,[prod.quantity_wanted,prod.product_id]);
                total += prod.quantity_wanted * prod.price;
                arr.push({...updatedData,bought:prod.quantity_wanted,purchasedPrice:prod.price});
            }
            else{
                throw new customError(404,`not sufficent stock ${prod.product_name}`);
            }
        }
        const order = await t.one("insert into orders(user_id,total_amount) values($1,$2)  returning *",[user_id,total]);
        for(let item of arr){
            const orderItems = await t.one("insert into order_items(order_id,product_id,quantity,price_at_purchase) values($1,$2,$3,$4) returning *",[order.order_id,item.product_id,item.bought,item.purchasedPrice]);
        }
        return order;
    });
    return order_details;
}

module.exports = {checkout}