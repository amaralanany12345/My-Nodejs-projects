const apiError=require('../utils/apiError')

const errorMiddleWare=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.status=err.status || 'error'
    sendError(err,res)
}

const sendError=(err,res)=>{
    return res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack
    })
}

module.exports=errorMiddleWare