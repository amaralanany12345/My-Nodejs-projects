const express=require('express')
const router=express.Router()
const {protect,allowedTo}=require('../services/authService')
const {buyCourse,buyTheCourse}=require('../services/orderService')

router.route('/:courseId').post(protect,allowedTo('student'),buyTheCourse)
router.get('/checkout-session/:courseId',protect,allowedTo('student'),buyCourse)

module.exports=router