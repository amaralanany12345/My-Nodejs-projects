const {signin,signup,registerUser,protect,allowedTo}=require('../services/authService')
const router=require('express').Router()
router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/registerUser').post(protect,allowedTo('admin'),registerUser)
module.exports=router