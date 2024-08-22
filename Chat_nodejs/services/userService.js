const chatModel = require('../models/chatModel');
const userModel=require('../models/userModel')
const apiError=require('../utils/apiError')
const express=require('express')
const app=express()
const { Server } = require('socket.io');
const httpServer = require('http').createServer(app);
const io = new Server(httpServer);

exports.getAllUser=async(req,res,next)=>{
    const users=await userModel.find()
    res.status(201).json({length:users.length,data:users})
}

exports.createUser=async(req,res,next)=>{
    const user=await userModel.create(req.body)
    res.status(201).json({data:user})
}

exports.getUser=async(req,res,next)=>{
    const user=await userModel.findById(req.params.userId)
    if(!user){
        return next (new apiError('user is not found'))
    }
    res.status(200).json({data:user})
}

exports.getUserByPhone=async(req,res,next)=>{
    const user=await userModel.findOne({phone:req.body.phone})
    if(!user){
        return next (new apiError('user is not found'))
    }
    res.status(200).json({data:user})
}

exports.addNewFriend=async(req,res,next)=>{
    const user=await userModel.findById({_id:req.user._id})
    if(!user){
        return next (new apiError('user is not found',404))
    }
    const newFriend=await userModel.findOne({phone:req.params.phone})
    if(!newFriend){
        return next (new apiError('user is not found',404))
    }
    const updatedUser=await userModel.findByIdAndUpdate({_id:req.user._id},{$push:{friends:{user:newFriend._id}}},{new:true})
    const updatedNewFriend=await userModel.findOneAndUpdate({phone:req.params.phone},{$push:{friends:{user:req.user._id}}},{new:true})
    const newChat=await chatModel.create({
    })
    await chatModel.findByIdAndUpdate({_id:newChat._id},{$push:{users:{user:user._id}}},{new:true})
    await chatModel.findByIdAndUpdate({_id:newChat._id},{$push:{users:{user:newFriend._id}}},{new:true})
    await newChat.save()
    res.status(200).json({data:updatedUser})

}
