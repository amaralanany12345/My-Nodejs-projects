const apiError = require('../general/apiError')
const watchLaterModel = require('../models/watchLaterModel')
const videoModel=require('../models/videoModel')

exports.addVideo=async(req,res,next)=>{
    const video=await videoModel.create({
        name:req.body.name,
        description:req.body.description,
        video:req.file
    })
    req.video=video
    next()
}

exports.addLike=async(req,res,next)=>{
    const video=await videoModel.findById(req.params.videoId)
    if(!video){
        return next(new apiError('video is not found',404))
    }
    const index=video.likes.findIndex((item)=>item.user.toString()==req.user._id.toString())
    if(index<0){
        const updatedVideo=await videoModel.findByIdAndUpdate({_id:req.params.videoId},{$push:{likes:{user:req.user._id}},$pull:{disLikes:{user:req.user._id}}},{new:true})
        res.status(201).json({data:updatedVideo})
    }
    else {
        return next (new apiError('you are add like before',404))
    }
}

exports.disLike=async(req,res,next)=>{
    const video=await videoModel.findById(req.params.videoId)
    if(!video){
        return next(new apiError('video is not found',404))
    }
    const index=video.disLikes.findIndex((item)=>item.user.toString()==req.user._id.toString())
    if(index<0){
        const updatedVideo=await videoModel.findByIdAndUpdate({_id:req.params.videoId},{$push:{disLikes:{user:req.user._id}},$pull:{likes:{user:req.user._id}}},{new:true})
        res.status(201).json({data:updatedVideo})
    }
    else {
        return next (new apiError('you are add dislike before',404))
    }
}

exports.addComment=async(req,res,next)=>{
    const video=await videoModel.findById(req.params.videoId)
    if(!video){
        return next(new apiError('video is not found',404))
    }
    const updatedVideo=await videoModel.findByIdAndUpdate({_id:req.params.videoId},{$push:{comments:{user:req.user._id,comment:req.body.comment}}},{new:true})
    res.status(201).json({data:updatedVideo})
}

exports.deleteComment=async(req,res,next)=>{
    const video=await videoModel.findById(req.params.videoId)
    if(!video){
        return next(new apiError('video is not found',404))
    }
    const index=video.comments.findIndex((item)=>item.user.toString()==req.user._id.toString())
    if(index<0){
        return next (new apiError(`you can not do that`,404))
    }
    else {
        const updatedVideo=await videoModel.findByIdAndUpdate({_id:req.params.videoId},{$pull:{comments:{user:req.user._id,_id:req.body.commentId}}},{new:true})
        res.status(201).json({data:updatedVideo})
    }
}

exports.getMyLikesVideos=async(req,res,next)=>{
    const videos=await videoModel.find()
    const likesVideos=[]
    for(let i=0;i<videos.length;i++){
        if(videos[i].likes.findIndex((item)=>item.user.toString()==req.user._id.toString())>-1){
            likesVideos.push(videos[i])
        }
    }
    res.status(200).json({data:likesVideos})
}
