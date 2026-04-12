const auth  = require("../middleware/authMiddleware");
const checkoutService = require("../services/checkoutService");


const checkout = async (req,res)=>{
    const user_id = req.user.id;
    const orders = await checkoutService.checkout(user_id);
    res.status(200).json({
        status:"success",
        data:orders
    });
}
module.exports = {checkout}