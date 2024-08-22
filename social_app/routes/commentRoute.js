const express=require('express')
const {addComment,deleteComment,getPostComment,addLikeToComment,deleteLikeFromComment}=require('../services/commentService')
const {protect,allowedTo}=require('../services/authService')
const router=express.Router()
router.route('/:postId').post(addComment).get(getPostComment)
router.route('/:commentId').delete(deleteComment)
router.route('/addCommentLike/:commentId').put(addLikeToComment)
router.route('/deleteCommentLike/:commentId').put(deleteLikeFromComment)

module.exports=router