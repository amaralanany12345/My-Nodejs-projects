const apiError = require('../general/apiError')
const watchLaterModel = require('../models/watchLaterModel')
const videoModel=require('../models/videoModel')

exports.addToWatchLater=async(req,res,next)=>{
    const watchLater=await watchLaterModel.findById(req.params.watchLaterId)
    if(!watchLater){
        return next(new apiError('watch later is not found',404))
    }
    const video=await videoModel.findById(req.body.videoId)
    if(!video){
        return next(new apiError('video is not found',404))
    }
    const index=watchLater.videos.findIndex((item)=>item._id.toString()==video._id.toString())
    if(index<0){
        const updatedWatchLater=await watchLaterModel.findByIdAndUpdate({_id:req.params.watchLaterId},{videos:{video:video._id}},{new:true})
        res.status(200).json({data:updatedWatchLater})
    }
    else{
        return next (new apiError('you this video to watch later before',404))
    }
}

exports.getUserWatchLater=async(req,res,next)=>{
    const watchLater=await watchLaterModel.findOne({user:req.user._id})
    if(!watchLater){
        return next(new apiError('watch later is not found',404))
    }
    res.status(200).json({data:watchLater})
}