const productRoute = require("express").Router();
const productController = require("../controllers/productController");
const admin = require("../middleware/admin");

productRoute.use(admin);

productRoute.post("/products/add",productController.addproduct);
productRoute.get("/products",productController.allproducts);
productRoute.get("/products/:productid",productController.getproduct);
productRoute.patch("/products/:productid",productController.modifyProduct);
productRoute.delete("/products/:productid",productController.removeProduct);
productRoute.post("/products/category",productController.addcategory);

module.exports = productRoute;