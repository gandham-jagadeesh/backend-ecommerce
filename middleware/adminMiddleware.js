const db = require("../db/db").db;

module.exports = async (req,res,next)=>{
    if(!req.user || !req.user.id){
        return res.status(401).json({
            status:"error",
            message:"unauthorized"
        });
    }
    const user = await db.oneOrNone("select admin from users where user_id = $1",[req.user.id])
    if(!user){
          return res.status(401).json({
            status:"error",
            message:"user not Found"
        });
    }
    if(!user.admin){
        return res.status(403).json({
            status:"error",
            message:"Forbidden"
        });
    }
    return next();
}