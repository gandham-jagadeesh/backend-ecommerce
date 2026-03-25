const authRouter = require("express").Router();
const authController = require("../controllers/authController");

authRouter.post("/signin",authController.signin);
authRouter.post("/signup",authController.signup);
module.exports = authRouter;

//2 routes :
// 1 -> /api/v1/auth/signin signup 
// 2 -> /api/v1/auth/signup signin