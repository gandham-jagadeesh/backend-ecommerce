const productRoute = require("express").Router();
const productController = require("../controllers/productController");
const admin = require("../middleware/admin");

productRoute.use(admin);

productRoute.post("/product/add",productController.addproduct);
productRoute.post("/product/category",productController.addcategory);

module.exports = productRoute;