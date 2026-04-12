const router = require("express").Router();
const checkoutController = require("../controllers/checkoutController.js");
const auth = require("../middleware/authMiddleware.js");
router.use(auth);
router.post("/",checkoutController.checkout);

module.exports = router;
