const db = require("../db/db");

const signin = (req,res)=>{

}

const signup = async (req,res)=>{
    const {firstname,lastname,email,password} = req.body;
    
}

module.exports = {
    signin,
    signup
}