const express=require('express')

const {createUser,getAllUser,addNewFriend,getUser,getUserByPhone}=require('../services/userService')
const { protect } = require('../services/authService')
const router=express.Router()

router.route('/').post(createUser).get(getAllUser)
router.route('/addNewFriend/:phone').put(protect,addNewFriend)
router.route('/getUser/:userId').get(getUser)
router.route('/getUserByPhone').get(getUserByPhone)
module.exports=router