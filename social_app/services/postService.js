const postModel=require('../models/postModel')
const userModel=require('../models/userModel')
const apiError=require('../general/apiError')
const jwt=require('jsonwebtoken')
const handlers=require('./handlers')


exports.addPost=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }

    if(!token){
        return next (new apiError('token is invalid',404))
    }
    const decoded=jwt.verify(token,"abcdef")
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }

    const post=await postModel.create({
        user:currentUser._id,
        post:req.body.post
    })
    res.status(200).json({data:post})
}

exports.getUserPosts=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }

    if(!token){
        return next (new apiError('token is invalid',404))
    }
    const decoded=jwt.verify(token,"abcdef")
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }
    const allUserPosts=await postModel.find({user:req.params.userId}).populate({path:'user',select:'name +_id'})
    res.status(201).json({data:allUserPosts})
}

exports.deleteUserPost=async (req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new apiError('token is not exist',404))
    }

    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }
    await postModel.findByIdAndDelete({_id:req.params.postId})
    res.status(204).json("deleted")
}

exports.getPostComments=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new apiError('token is not exist',404))
    }

    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }
    const post=await postModel.findById(req.params.podtId)
    
}

exports.addLikeToPost=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new apiError('token is not exist',404))
    }

    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }
    const post =await postModel.findById({_id:req.params.postId})
    let c=0;
    for(let i=0;i<post.likes.length;i++){
        if(post.likes[i].user.toString()==currentUser._id.toString()){
                c++
            }
        }
        if(c==0){
            post.likes.push({user:currentUser._id})
            await post.save()
        }
        else {
            return next (new apiError('tou are add like to this post before',404))
        }
    res.status(200).json({data:post})
}

exports.deletePostLike=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new apiError('token is not exist',404))
    }

    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }

    const post =await postModel.findByIdAndUpdate({_id:req.params.postId},{$pull:{likes:{user:currentUser._id}}},{new:true})
    res.status(200).json({data:post})
}

exports.getAllPosts=async(req,res,next)=>{
    
    const allPosts=await postModel.find({}).populate({path:'user',select:'name +_id'})
    res.status(201).json({data:allPosts})
}
exports.getPost=async(req,res,next)=>{
    const post=await postModel.findById({_id:req.params.postId}).populate({path:'user',select:'name +_id'})
    res.status(200).json({data:post})
}

exports.getPostLike=async(req,res,next)=>{
    let userAddLike=[];
    const post=await postModel.findById({_id:req.params.postId})
    for(let i=0;i<post.likes.length;i++){
        const user=await userModel.findById(post.likes[i].user)
        userAddLike.push(user)
    }
    res.status(200).json({data:userAddLike})

}

exports.getAllowedPostToUser = async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new apiError('token is not exist',404))
    }

    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }
    let allowedPost=[]
    if(currentUser.following.length==0){
        const suggestsPosts=await postModel.find({}).populate({path:'user',select:'name +_id'})
        allowedPost.push(suggestsPosts)
    }
    else {
        for(let i=0;i<currentUser.following.length;i++){
            const posts=await postModel.find({user:currentUser.following[i].followed.toString()}).populate({path:'user',select:'name +_id'})
            allowedPost.push(posts)
        }
    }
    res.status(200).json({data:allowedPost})
}
