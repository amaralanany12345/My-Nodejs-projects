const handlers=require('./handlers')
const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
const apiError=require('../general/apiError')

exports.createUser= handlers.createOne(userModel)
exports.updateUser= handlers.updateOne(userModel)
exports.deleteUser= handlers.deleteOne(userModel)
exports.getUser= handlers.getSpecificOne(userModel)
exports.getAllUser= handlers.getAll(userModel)

exports.addFollow = async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next (new apiError('token is invalid',404))
    }
    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }
    const followedUser=await userModel.findById({_id:req.params.userId})
    let c=0
    for(let i=0;i<currentUser.following.length;i++){
        if(currentUser.following[i].followed.toString()==followedUser._id.toString()){
            c++
        }
    }
    if(c==0){
        await userModel.findByIdAndUpdate({_id:req.params.userId},{$push:{followers:{follower:currentUser._id}}},{new:true})
       await userModel.findByIdAndUpdate({_id:currentUser._id},{$push:{following:{followed:followedUser._id}}},{new:true})
    }
    else {
        return next (new apiError('you are add follow before',404))
    }
    res.status(200).json({data:currentUser})
}

exports.unFollow=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next (new apiError('token is invalid',404))
    }
    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }
    const followedUser=await userModel.findById({_id:req.params.userId})
    await userModel.findByIdAndUpdate({_id:req.params.userId},{$pull:{following:{followed:currentUser._id}}},{new:true})
    await userModel.findByIdAndUpdate({_id:currentUser._id},{$pull:{followers:{follower:followedUser._id}}},{new:true})
    res.status(200).json({data:currentUser})
}

exports.getUserFollower=async(req,res,next)=>{
 
    let followers=[]
    const userFollowers=await userModel.findById({_id:req.params.userId})
    for(let i=0;i<userFollowers.followers.length;i++){
        const theFollowers=await userModel.findById(userFollowers.followers[i].follower)
       followers.push(theFollowers)
    }
    res.status(200).json({data:followers})
}

exports.getUserFollowing=async(req,res,next)=>{
 
    let following=[]
    const userFollowing=await userModel.findById({_id:req.params.userId})
    for(let i=0;i<userFollowing.following.length;i++){
        const theFollowing=await userModel.findById(userFollowing.following[i].followed)
       following.push(theFollowing)
    }
    res.status(200).json({data:following})
}
