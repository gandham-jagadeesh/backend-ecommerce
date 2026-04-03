const authService = require("../services/authService");

const signin = async (req,res,)=>{
    const user  = req.body;
    const data = await authService.signin(user);
    return res.status(200).json({
        status:"success",
        data:data
    })
};

const signup = async (req,res)=>{
    const user = req.body;
    const data = await authService.signup(user);   
    return res.status(201).json({
        status: "success",
        data: data
    });
}

module.exports = {
    signin,
    signup
}