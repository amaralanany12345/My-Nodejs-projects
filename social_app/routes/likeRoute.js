const express=require('express')
const {addLike,getPostLike,deleteLike}=require('../services/likeService')
const router=express.Router()

router.route('/').post(addLike)
router.route('/:postId').get(getPostLike).delete(deleteLike)
module.exports=router