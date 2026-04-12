const customError = require("../utilites/appError");

const db = require("../db/db").db;


const addItem = async (product_id,quantity,user_id)=>{
     if(quantity > 1_000_000){
            throw new customError(400,"invalid quantity");
    }
    try{
        const cart_item = await db.tx(async (t)=>{
             const cart = await t.one(
            "insert into carts(user_id) values($1) on conflict(user_id) do update set user_id = excluded.user_id returning *",
            [user_id]);

        const cart_item = await t.one(
            "insert into cartitems(cart_id,product_id,quantity) values($1,$2,$3) on conflict(cart_id,product_id) do update set quantity = cartitems.quantity + excluded.quantity  returning *",
        [cart.cart_id,product_id,quantity]);
        return cart_item;  
        });
        return cart_item;
    }
    catch(e){
        if(e.code == "23503"){
            throw new customError(400,"invalid user or product");
        }
        if(e.code == "22P02"){
            throw new customError(400,"invalid data format");
        }
        throw e;
    }
}


const updateItem = async (cart_item_id,quant,user_id)=>{
 const deleteQuery  = "delete from cartitems ci  using  carts c where c.cart_id = ci.cart_id  and ci.cart_item_id = $1  and ci.quantity + $2  <= 0 and c.user_id = $3 returning ci.*";
 const updateQuery  = "update cartitems ci set quantity = quantity + $1 from carts c where c.cart_id = ci.cart_id  and c.user_id=$3 and ci.cart_item_id=$2 returning ci.*";
 const deletedCartItem = await db.oneOrNone(deleteQuery,[cart_item_id,quant,user_id]);
 if(deletedCartItem){
    return deletedCartItem
 }
 const updatedCartItem = await db.oneOrNone(updateQuery,[quant,cart_item_id,user_id]);
 if(!updatedCartItem){
    throw new customError(404,"not found");
 }
  return updatedCartItem;
}

const deletItem = async (cart_item_id,user_id)=>{
    const deleteQuery = "delete from cartitems ci using carts c   where ci.cart_id = c.cart_id and ci.cart_item_id = $1 and c.user_id = $2  returning *";
    const deletedQuery = await db.oneOrNone(deleteQuery,[cart_item_id,user_id]);
    if(!deletedQuery){
        throw new customError(404,"cart_item not found");
    }
    return deletedQuery;
}


const getAllItems = async (user_id)=>{
        const items = await db.manyOrNone("select ci.* from cartitems ci  join carts c on  ci.cart_id = c.cart_id where  c.user_id = $1",[user_id]);
        return items;
}

const getItem = async (cart_item_id,user_id)=>{
        const item  = await db.oneOrNone("select ci.* from cartitems ci  join  carts c on  ci.cart_id = c.cart_id where c.user_id = $1 and  ci.cart_item_id= $2",[user_id,cart_item_id]);
        if(!item){
            throw new customError(404,"no products");
        }
        return item;
}

module.exports = {
 addItem,
 updateItem,
 deletItem,
 getAllItems,
 getItem
}