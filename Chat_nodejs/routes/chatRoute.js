const express=require('express')

const {protect,allowedTo}=require('../services/authService')
const {getChat,addMessageToChat,getAllUserChats,getChatMessages}=require('../services/chatService')
const router=express.Router()

router.route('/getChat/:chatId').get(getChat)
router.route('/addMessageToChat/:chatId').put(protect,addMessageToChat)
router.route('/getAllUserChats').get(protect,getAllUserChats)
router.route('/getChatMessages/:chatId').get(protect,getChatMessages)
module.exports=router