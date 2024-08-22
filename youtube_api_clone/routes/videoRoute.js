const router=require('express').Router()
const {protect} =require('../services/authService')
const {addLike,disLike,addComment,deleteComment,getMyLikesVideos} =require('../services/videoService')
const multer=require('multer')
const upload=multer({dest:'uploads/videos'})

router.route('/addLike/:videoId').put(protect,addLike)
router.route('/disLike/:videoId').put(protect,disLike)
router.route('/addComment/:videoId').put(protect,addComment)
router.route('/deleteComment/:videoId').put(protect,deleteComment)
router.route('/getMyLikesVideos').get(protect,getMyLikesVideos)
module.exports=router