const router = require("express").Router();
const cartController = require("../controllers/cartController");
const auth= require("../middleware/authMiddleware");
router.use(auth);
router.get("/",cartController.getCartItems);
router.post("/",cartController.addCartItem);
router.patch("/:cart_item_id",cartController.updateCartItem);
router.delete("/:cart_item_id",cartController.deleteCartItem); 
router.get("/:cart_item_id",cartController.getCartItem)
module.exports = router;