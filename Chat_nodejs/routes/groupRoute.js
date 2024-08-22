const express=require('express')

const {protect,allowedTo}=require('../services/authService')
const {createGroup,getUserGroups,addMessageToGroup,getGroupMessages,getGroup,addUsersToGroup,getGroupUsers}=require('../services/groupService')
const router=express.Router()

router.route('/createGroup').post(protect,createGroup)
router.route('/getUserGroups').get(protect,getUserGroups)
router.route('/addMessageToGroup/:groupId').put(protect,addMessageToGroup)
router.route('/addUsersToGroup/:groupId').put(protect,addUsersToGroup)
router.route('/getGroupMessages/:groupId').get(protect,getGroupMessages)
router.route('/getGroup/:groupId').get(protect,getGroup)
router.route('/getGroupUsers/:groupId').get(getGroupUsers)
module.exports=router