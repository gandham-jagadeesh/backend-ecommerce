const publicProductController = require("../controllers/publicProductController");
const router  = require("express").Router();
const auth = require("../middleware/authMiddleware");

router.use(auth);

router.get("/:product_id",publicProductController.getProduct);
router.get("/",publicProductController.getAllProducts);

module.exports = router;