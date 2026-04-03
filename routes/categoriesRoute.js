const categoryRoute = require("express").Router();
const admin  = require("../middleware/adminMiddleware");
const auth = require("../middleware/authMiddleware");
const categoryController = require("../controllers/categoryController")

categoryRoute.use(auth,admin);

categoryRoute.post("/",categoryController.addCategory);
categoryRoute.get("/:category_id",categoryController.getCategory);
categoryRoute.patch("/:category_id",categoryController.updateCategory);
categoryRoute.delete("/:category_id",categoryController.deleteCategory)
categoryRoute.get("/",categoryController.getAllCategories);
module.exports = categoryRoute;
