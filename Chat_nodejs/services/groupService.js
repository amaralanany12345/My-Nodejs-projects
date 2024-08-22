const apiError=require('../utils/apiError')
const groupModel=require('../models/groupModel')
const messageModel = require('../models/messageModel')
const express=require('express')
const app=express()
const { Server } = require('socket.io');
const userModel = require('../models/userModel')
const httpServer = require('http').createServer(app);
const io = new Server(httpServer);

exports.createGroup=async(req,res,next)=>{
    const group=await groupModel.create({})
    const updatedGroup=await groupModel.findByIdAndUpdate({_id:group._id},{$push:{users:{user:req.user._id},admins:{user:req.user._id}}},{new:true})
    res.status(200).json({data:updatedGroup})
}

exports.getGroup=async(req,res,next)=>{
    const group=await groupModel.findById(req.params.groupId)
    if(!group){
        return next (new apiError('user is not in this group',404))
    }
    io.emit('group messages',group.messages)
    res.status(201).json({data:group})
}

exports.getUserGroups=async(req,res,next)=>{
    const groups=await groupModel.find({ users: { $elemMatch: { user: req.user._id } } } )
    if(!groups){
        return next (new apiError('user is not in this group',404))
    }
    res.status(200).json({data:groups})
}

exports.addMessageToGroup=async(req,res,next)=>{
    const group=await groupModel.findById(req.params.groupId)
    if(!group){
        return next (new apiError('group is not found',404))
    }
    const newMessage=await messageModel.create({
        message:req.body.message,
        user:req.user._id
    })
    const updatedgroup=await groupModel.findByIdAndUpdate({_id:req.params.groupId},{$push:{messages:{message:newMessage}}},{new:true})
    io.emit('new group message',newMessage)
    res.status(200).json({data:updatedgroup})
}

exports.getGroupMessages=async(req,res,next)=>{
    const group=await groupModel.findById({_id:req.params.groupId})
    if(!group){
        return next (new apiError('group is not found',404))
    }
    let messages=[]
    for(let i=0;i<group.messages.length;i++){
        messages.push(await messageModel.findById(group.messages[i].message).populate({path:'user',select:'name +_id'}))
    }
    res.status(200).json({data:messages})
}

exports.addUsersToGroup=async(req,res,next)=>{
    const group=await groupModel.findById(req.params.groupId)
    if(!group){
        return next (new apiError('group is not found',404))
    }
    const index=group.admins.findIndex((item)=>item.user.toString()==req.user._id.toString())
    if(index<0){
        return next (new apiError('only admins can add new users',404))
    }
    else {
        const newUser=await userModel.findOne({phone:req.query.phone})
        if(!newUser){
            return next (new apiError('user is not found',404))
        }
        const index=group.users.findIndex((item)=>item.user.toString()==newUser._id.toString())
        if(index>-1){
            return next (new apiError('user is added before',404))
        }
        const updatedGroup=await groupModel.findByIdAndUpdate({_id:req.params.groupId},{$push:{users:{user:newUser._id}}},{new:true})
        res.status(200).json({data:group})
    }
}

exports.getGroupUsers=async(req,res,next)=>{
    const group=await groupModel.findById(req.params.groupId)
    if(!group){
        return next (new apiError('group is not found',404))
    }
    let groupUsers=[]
    for(let i=0;i<group.users.length;i++){
        groupUsers.push(await userModel.findById(group.users[i].user))
    }
    res.status(200).json({data:groupUsers})
}

exports.joinToGroup=async(req,res,next)=>{

}