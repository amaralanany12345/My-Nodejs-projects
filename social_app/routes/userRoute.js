const express=require('express')
const {createUser,updateUser,deleteUser,getUser,getAllUser,addFollow,unFollow,getUserFollower,getUserFollowing}=require(`../services/userService`)
const router=express.Router()

router.route('').post(createUser).get(getAllUser)
router.route('/:id').put(updateUser).get(getUser).delete(deleteUser)
router.route('/addFollow/:userId').put(addFollow)
router.route('/unFollow/:userId').put(unFollow)
router.route('/userFollower/:userId').get(getUserFollower)
router.route('/userFollowing/:userId').get(getUserFollowing)
module.exports=router