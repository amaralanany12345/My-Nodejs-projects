const router=require('express').Router()
const {protect} =require('../services/authService')
const {addVideo} =require('../services/videoService')
const {createChannel,getChannel,addVideoToChannel,uploadVideo,deleteVideoFromChannel,
deleteChannel,allowedTo,subscripetoChannel,unsubscripe,getChannelVideos,getMySubscribesChannels}=require('../services/channelService')
const multer=require('multer')
const upload=multer({dest:'uploads/videos'})

router.route('/').post(protect,createChannel)
router.route('getChannel/:channelId').get(getChannel)
router.route('/deleteChannel/:channelId').delete(protect,allowedTo,deleteChannel)
router.route('/addVideoToChannel/:channelId').put(protect,allowedTo,uploadVideo,addVideo,addVideoToChannel)
router.route('/deleteVideoFromChannel/:channelId').put(protect,allowedTo,deleteVideoFromChannel)
router.route('/subscripetoChannel/:channelId').put(protect,subscripetoChannel)
router.route('/unsubscripe/:channelId').put(protect,unsubscripe)
router.route('/getChannelVideos/:channelId').get(protect,getChannelVideos)
router.route('/getMySubscribesChannels').get(protect,getMySubscribesChannels)
module.exports=router