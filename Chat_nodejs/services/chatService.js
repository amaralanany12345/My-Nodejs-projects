const apiError=require('../utils/apiError')
const chatModel=require('../models/chatModel')
const userModel=require('../models/userModel')
const messageModel=require('../models/messageModel')
const express=require('express')
const app=express()
const { Server } = require('socket.io');
const httpServer = require('http').createServer(app);
const io = new Server(httpServer);

exports.getAllUserChats=async(req,res,next)=>{
    const chats=await chatModel.find({ users: { $elemMatch: { user: req.user._id } } })
    res.status(200).json({data:chats})
}

exports.getChat=async(req,res,next)=>{
    const chat=await chatModel.findById(req.params.chatId)
    if(!chat){
        return next (new apiError('chat is not found',404))
    }
    io.emit('messages',chat.messages)
    res.status(201).json({data:chat})
}

exports.addMessageToChat=async(req,res,next)=>{
    const chat =await chatModel.findById(req.params.chatId)
    if(!chat){
        return next (new apiError('chat is not found',404))
    }
    const newMessage=await messageModel.create({
        message:req.body.message,
        user:req.user._id
    })
    const updatedChat=await chatModel.findByIdAndUpdate({_id:req.params.chatId},{$push:{messages:{message:newMessage}}},{new:true})
    io.emit('new message', newMessage)
    res.status(200).json({data:updatedChat})
}

exports.getChatMessages=async(req,res,next)=>{
    const chat =await chatModel.findById(req.params.chatId)
    if(!chat){
        return next (new apiError('chat is not found',404))
    }
    let messages=[]
    for(let i=0;i<chat.messages.length;i++){
        messages.push(await messageModel.findById(chat.messages[i].message).populate({path:'user',select:'name +_id'}))
    }
    res.status(200).json({data:messages})
}
