const apiError=require('../general/apiError')
const commentModel=require('../models/commentModel')
const userModel=require('../models/userModel')
const postModel=require('../models/postModel')
const jwt=require('jsonwebtoken')

exports.addComment=async(req,res,next)=>{
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
    const comment=await commentModel.create({
        user:currentUser._id,
        comment:req.body.comment,
        post:req.params.postId
    })
    const post=await postModel.findById(req.params.postId).populate({path:'user',select:'name +_id'})
    post.comments.push({comment:comment._id,content:comment.comment})
    await post.save()
    res.status(201).json({data:comment})
}

exports.deleteComment =async(req,res,next)=>{
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
    const comment=await commentModel.findById(req.params.commentId)
    if(comment.user.toString()==currentUser._id.toString()){
       const deletedComment=await commentModel.findByIdAndDelete(req.params.commentId)
        const commentInpost=await postModel.findOneAndUpdate({_id:comment.post},{$pull:{comments:{comment:req.params.commentId}}},{new:true})  
    }
    else {
        return next (new apiError('you are not allowed to delete this comment',404))
    }
    res.status(204).json('deleted')
}

exports.addLikeToComment=async(req,res,next)=>{
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
    const comment=await commentModel.findById(req.params.commentId)
    const post =await postModel.findOne({_id:req.body.post})
    
    let c=0;
    for(let i=0;i<comment.likes.length;i++){
        if(comment.likes[i].user.toString()==currentUser._id.toString()){
                c++
            }
        }
    if(c==0){
        comment.likes.push({user:currentUser._id})
        const PostComment= post.comments.find((item)=>item.comment.toString()==req.params.commentId.toString())
        PostComment.commentLikes.push({user:currentUser})
        await post.save()
    }
    else {
        return next (new apiError('you are add like to this CommentBefore',404))
    }
    await comment.save()
    res.status(200).json({data:comment})

}

exports.deleteLikeFromComment=async(req,res,next)=>{
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
    const comment=await commentModel.findByIdAndUpdate(req.params.commentId,{$pull:{likes:{user:currentUser}}},{new:true})
    const post =await postModel.findOne({_id:req.body.post})

    for(let i=0;i<post.comments.length;i++){
        if(post.comments[i].comment==req.params.commentId){
            for(let j=0;j<post.comments[i].commentLikes.length;j++){
                if(post.comments[i].commentLikes[j].user.toString()==currentUser._id){
                    post.comments[i].commentLikes.splice(j,1)
                }
            }
        }
    }
    await post.save()
    res.status(200).json({data:comment})

}

exports.getPostComment=async(req,res,next)=>{
    const comments=await commentModel.find({post:req.params.postId}).populate({path:'user',select:'name +_id'})
    res.status(200).json({data:comments})
}
