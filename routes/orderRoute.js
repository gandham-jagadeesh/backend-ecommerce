const auth = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController.js");
const router = require("express").Router();
router.use(auth)

router.get("/",orderController.getOrders);
router.get("/:order_item_id",orderController.getOrderItem);

module.exports = router;