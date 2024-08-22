const commentLikeModel=require('../models/commentLikeModel')
const apiError=require('../general/apiError')
const commentModel=require('../models/commentModel')
const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')


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

    let c=0;
    for(let i=0;i<comment.likes.length;i++){
        if(post.likes[i].user.toString()==currentUser._id.toString()){
            c++
        }
    }
    if(c==0){

        const commentLike=await commentLikeModel.create({
            user:currentUser._id,
            comment:req.params.commentId
        })
        comment.likes.push({commentLike:commentLike._id,user:currentUser._id})
        await comment.save()
        res.status(200).json({data:commentLike})
    }
    else {
        return next (new apiError('you add like to this comment before',404))
    }

}