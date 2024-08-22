const apiError=require('../general/apiError')
const commentModel = require('../models/commentModel')
const likeModel=require('../models/likeModel')
const postModel=require('../models/postModel')
const userModel=require('../models/userModel')
const jwt =require('jsonwebtoken')

exports.addLike=async(req,res,next)=>{
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
    const post =await postModel.findById(req.body.post)
    let c=0;
    for(let i=0;i<post.likes.length;i++){
        if(post.likes[i].user.toString()==currentUser._id.toString()){
            c++
        }
    }
    if(c==0){
        const like=await likeModel.create({
            user:currentUser._id,
            post:post._id
        })
        post.likes.push({like:like._id,user:currentUser._id})
        await post.save()
        res.status(201).json({data:like})
    }
    else {
        return next (new apiError('you add like before'))
    }
}

exports.deleteLike= async (req,res,next)=>{
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
    const like=await likeModel.findOneAndDelete({post:req.params.postId,user:currentUser._id})
    const post=await postModel.findOneAndUpdate({_id:req.params.postId},{$pull:{likes:{user:currentUser._id}}},{new:true})
    res.status(201).json('deleted')
}   

exports.getPostLike=async(req,res,next)=>{
    const postLikes=await likeModel.find({post:req.params.postId}).populate({path:'user',select:'name +_id'})
    res.status(201).json({data:postLikes})
}
