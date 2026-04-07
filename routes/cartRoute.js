const router = require("express").Router();
const cartController = require("../controllers/cartController");
router.get("/",cartController.getCartItems);
router.post("/",cartController.addCartItem);
router.patch("/cart_item_id",cartController.updateCartItem);
router.delete("/cart_item_id",cartController.deleteCartItem); 
