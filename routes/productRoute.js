const productRoute = require("express").Router();
const productController = require("../controllers/productController");
const admin  = require("../middleware/adminMiddleware");
const auth = require("../middleware/authMiddleware");

productRoute.use(auth,admin);

productRoute.post("/",productController.addProduct);
productRoute.patch("/:product_id",productController.updateProduct);
productRoute.delete("/:product_id",productController.deletedProduct);
productRoute.get("/:product_id",productController.getproduct);
productRoute.get("/",productController.getAllProducts);

module.exports = productRoute;