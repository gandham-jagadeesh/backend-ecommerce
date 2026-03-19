const {verify} = require("../utilites/jwt");
const db = require("../db/db");
module.exports = async (req,res,next)=>{
    const token = req.body.token;
    const id = await verify(token,"i am in idiot");
    const user = await db.oneOrNone("select admin  from users where userid = $1",[id]);
    if(!user.admin){
        return res.status(403).json({
            err:"forbidden access"
        })
    }
    next();
}