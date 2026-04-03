const {verify} = require("../utilites/jwt");

module.exports = async (req,res,next)=>{
    const authHeader  = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({
            status:"error",
            message:"No token Provided"
        });
    }
    const parts = authHeader.trim().split(" ");
    if( parts.length !== 2 || parts[0] !== "Bearer"){
        return res.status(401).json({
            status: "error",
            message:"Invalid token format"
        })
    }
    const token  = parts[1];
    try{
        const {id,admin} = verify(token);
        req.user = {id,admin};
        return next();
    }
    catch(e){
        return res.status(401).json({
            status:"error",
            message:"Invalid token"
        });
    }
}