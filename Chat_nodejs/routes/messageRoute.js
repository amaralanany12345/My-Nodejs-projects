const express=require('express')

const {protect,allowedTo}=require('../services/authService')
const {getMessage}=require('../services/messageService')
const router=express.Router()

router.route('/getMessage/:messageId').get(getMessage)
module.exports=router