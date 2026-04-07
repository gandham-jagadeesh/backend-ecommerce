const db = require("../db/db").db;

// i can only check product_id and quantity,user_id are uuid or not
const addItem = async (product_id,quantity,user_id)=>{
    try{
        // syntax issues , user_id does not exists , user_id exists already as its unique :
        // user_id : can check with select query or can check in catch error by status code return such that user not exists may be deleted but are we allowing that ?? how to stop from deleting the user when cart is using it up
        // user_id alreadu exists : select query + insert -> better -> insert + onconflict update the userid
        //what if user_id is wrong at max it wil be perfect because  we are taking that from jwt may be if user_id is deleted that can be the cause right are we allowing that 
        const cart = db.oneOrNone(
            "insert into carts(user_id) values($1) on conflict(user_id) update set user_id = excluded.user_id returning *",
            [user_id]);
        // cart_item already existss : update the quantiy may be user clicked add to cart twice may be
        // cart_item does not already exists insert
        // what if product_id or cart_id is wrong thats a case to consider right thats throws conflic are these two different conflits liek onconflict() monly for already for exisiting ones or like what 
        const cart_item = db.oneOrNone(
            "insert into cartitems(cart_id,product_id,quantity) values($1,$2,$3) on conflict(cart_id,product_id) update quantity = quantity + excluding.quantity  returning *",
        []);
        }
    catch(e){
        throw e;
    }
}

module.exports = {
 addItem
}