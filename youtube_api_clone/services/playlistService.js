const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const multer=require('multer')
const channelModel=require('../models/channelModel')
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

exports.addVideoToPlaylist=async(req,res,next)=>{
    const video=await playlistModel.findByIdAndUpdate({_id:req.params.playlistId},{$push:{videos:{video:req.file}}},{new:true})
    res.status(200).json({data:video})
}

exports.deletevideoFromPlaylist=async(req,res,next)=>{
    const playlist=await playlistModel.findById(req.params.playlistId)
    if(!playlist){
        return next (new apiError('playlist is not found',404))
    }
    const newplaylist=await playlistModel.findByIdAndUpdate({_id:req.params.playlistId},{$pull:{videos:{_id:req.body.videoId}}},{new:true})
    res.status(200).json({data:newplaylist})
}

exports.createPlaylistInChannel=async(req,res,next)=>{
    const playlist= await playlistModel.create({
        name:req.body.name,
        admin:req.user._id,
        channel:req.params.channelId,
    })
    const channel=await channelModel.findById(req.params.channelId)

    if(channel.admin.toString()==req.user._id.toString()){
        const updatedchannel=await channelModel.findByIdAndUpdate({_id:req.params.channelId},{$push:{playLists:{playlist:playlist._id}}},{new:true})
        res.status(200).json({data:playlist})
    }
    else {
        return next (new apiError('you are not allowed to add play list for this channel',404))
    }
}

exports.createPlaylistforUser=async(req,res,next)=>{
    const playlist=await playlistModel.create({
        name:req.body.name,
        admin:req.user._id,
    })
    res.status(201).json({data:playlist})
}

exports.deletePlaylist=async(req,res,next)=>{
    const playlist=await playlistModel.findById({_id:req.params.playlistId})
    if(!playlist){
        return next (new apiError('playlist is not found',404))
    }
    const deletedplaylist=await playlistModel.findByIdAndDelete({_id:req.params.playlistId})
    res.status(204).json('deleted')
}

exports.allowedTo=async(req,res,next)=>{
    const playlist=await playlistModel.findById(req.params.playlistId)
    if(!playlist){
        return next (new apiError('playlist is not found',404))
    }
    if(req.user._id.toString()!=playlist.admin.toString()){
        return next (new apiError('you are not allowed to access this route',404))
    }
    next()
}