const express=require('express')

const {addLikeToComment}=require('../services/commentLikeService')

const router=express.Router({mergeParams:true})

router.route('/:commentId').post(addLikeToComment)

module.exports=router