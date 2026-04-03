const errorMiddleware = (err,req,res,next)=>{
    console.error({
        message:err.message,
        status:err.status,
        stack:err.stack
    });
    const message = err.message || "Internal Server Error";
    const status  = err.status || 500;
    return res.status(status).json({
        status:"error",
        message:message
    });
}
module.exports = errorMiddleware;
