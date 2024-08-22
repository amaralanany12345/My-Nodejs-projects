const router=require('express').Router()
const {protect} =require('../services/authService')
const {addVideo} =require('../services/videoService')
const {allowedTo,createPlaylistforUser,createPlaylistInChannel,addVideoToPlaylist,uploadVideo,deletevideoFromPlaylist,deletePlaylist}=require('../services/playlistService')
const multer=require('multer')
const playlistModel = require('../models/playlistModel')
const upload=multer({dest:'uploads/videos'})
router.route('/createPlaylistInChannel/:channelId').post(protect,createPlaylistInChannel)
router.route('/createPlaylistforUser').post(protect,createPlaylistforUser)
router.route('/addVideo/:playlistId').put(protect,allowedTo,uploadVideo,addVideoToPlaylist)
router.route('/deleteVideoFromPlaylist/:playlistId').put(protect,allowedTo,deletevideoFromPlaylist)
router.route('/deletePlaylist/:playlistId').delete(protect,allowedTo,deletePlaylist)

module.exports=router
