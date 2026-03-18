const authRouter = require("express").Router();
const authController = require("../controllers/authController");

authRouter.post("/api/v1/signin",authController.signin);
authRouter.post("/api/v1/signup",authController.signup);