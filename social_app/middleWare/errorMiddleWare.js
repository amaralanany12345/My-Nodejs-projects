const apiError=require('../general/apiError')
const errorMiddleWare=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.status=err.status || 'error'
    if(err.name === "TokenExpiredError"){
        err= handleJwtExpired()
    }
    if(err.name === "JsonWebTokenError"){
        err= handleJwtExpired()
    }
    
    sendErrorForDev(err,res)
}



const sendErrorForDev=(err,res)=>{
    return res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}
const handleJwtExpired=()=>{
    new apiError('expired token',401)
}

module.exports=errorMiddleWare