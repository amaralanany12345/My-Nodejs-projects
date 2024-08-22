const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const multer=require('multer')
const channelModel=require('../models/channelModel')
const videoModel=require('../models/videoModel')
const playlistModel=require('../models/playlistModel')
const apiError=require('../general/apiError')
const {v4:uuidv4}=require('uuid')
const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/videos')
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split("/")[1]
        const filename=`video-${uuidv4()}-${Date.now()}.${ext}`
        cb(null,filename)
    }
})


const multerFilter = function(req,file,cb){
    const ext=file.mimetype.split("/")[1]
    const filename=`video-${uuidv4()}-${Date.now()}.${ext}`
    if(file.mimetype.startsWith("video")){
        cb(null,true)
    }
    else {
        cb(new apiError('only video allowed',400))
    }

    req.file=filename
}
  
const upload=multer({storage:multerStorage,fileFilter:multerFilter})

exports.uploadVideo=upload.single('video')

exports.addVideoToChannel=async(req,res,next)=>{
    const channel=await channelModel.findByIdAndUpdate({_id:req.params.channelId},{$push:{videos:{video:req.video}}},{new:true})
    if(!channel){
        return next (new apiError('channel is not found',404))
    }
    res.status(200).json({data:channel})
}

exports.getChannelVideos=async(req,res,next)=>{
    const channel=await channelModel.findById(req.params.channelId)
    if(!channel){
        return next (new apiError('channel is not found',404))
    }
    let videos=[]
    for(let i=0;i<channel.videos.length;i++){
        videos.push(await videoModel.findById(channel.videos[i].video))
    }
    res.status(200).json({data:videos})
}


exports.deleteVideoFromChannel=async(req,res,next)=>{
    const channel=await channelModel.findById(req.params.channelId)
    if(!channel){
        return next (new apiError('channel is not found',404))
    }
    const updatedChannel=await channelModel.findByIdAndUpdate({_id:req.params.channelId},{$pull:{videos:{_id:req.body.videoId}}},{new:true})
    res.status(200).json({data:updatedChannel})
}

exports.deleteChannel=async(req,res,next)=>{
    const channel=await channelModel.findById({_id:req.params.channelId})
    if(!channel){
        return next (new apiError('channel is not found'))
    }
    const deletedChannel=await channelModel.findByIdAndDelete({_id:req.params.channelId})
    res.status(204).json('deleted')
   
}


exports.createChannel=async(req,res,next)=>{
    const channel=await channelModel.create({
        name:req.body.name,
        admin:req.user._id,
        category:req.body.category
    })

    res.status(201).json({data:channel})
}

exports.getChannel= async(req,res,next)=>{
    const channel=await channelModel.findById(req.params.channelId)
    if(!channel){
        return next (new apiError('channel is not found',404))
    }
    res.status(200).json({data:channel})
}

exports.subscripetoChannel=async(req,res,next)=>{
    const channel=await channelModel.findById(req.params.channelId)
    if(!channel){
        return next (new apiError('channel is not found',404))
    }
    const updatedChannel=await channelModel.findByIdAndUpdate({_id:req.params.channelId},{$push:{subscribers:{user:req.user}}},{new:true})
    res.status(200).json({data:updatedChannel})
}

exports.unsubscripe=async(req,res,next)=>{
    const channel=await channelModel.findById(req.params.channelId)
    if(!channel){
        return next (new apiError('channel is not found',404))
    }
    const index=channel.subscribers.findIndex((item)=>item.user.toString()==req.user._id.toString())
    if(index<0){
        return next (new apiError('you are not allowed to un sbscripe',404))
    }
    else {
        const updatedChannel=await channelModel.findByIdAndUpdate({_id:req.params.channelId},{$pull:{subscribers:{user:req.user._id}}},{new:true})
        res.status(200).json({data:updatedChannel})
    }
}

exports.allowedTo=async(req,res,next)=>{
    const channel=await channelModel.findById(req.params.channelId)
    if(!channel){
        return next (new apiError('channel is not found',404))
    }
    if(req.user._id.toString()!=channel.admin.toString()){
        return next (new apiError('you are not allowed to access this route',404))
    }
    next()
}

exports.getMySubscribesChannels=async(req,res,next)=>{
    const channels=await channelModel.find()
    let subsscribedChannels=[]
    for(let i=0;i<channels.length;i++){
        if(channels[i].subscribers.findIndex((item)=>item.user.toString()==req.user._id.toString())>-1){
            subsscribedChannels.push(channels[i])
        }
    }
    res.status(201).json({data:subsscribedChannels})
}