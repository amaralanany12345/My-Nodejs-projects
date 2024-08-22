const messageModel=require('../models/messageModel')
const apiError = require('../utils/apiError')

exports.getMessage=async(req,res,next)=>{
    const message=await messageModel.findById(req.params.messageId).populate({path:'user',select:'name +_id'})
    if(!message){
        return next (new apiError('message is not found',404))
    }
    res.status(200).json({data:message})
}