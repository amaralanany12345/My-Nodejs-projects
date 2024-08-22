const express=require('express')
const router=express.Router()
const {createCoupon,getCoupon} =require('../services/couponService')
const {protect,allowedTo}=require('../services/authService')

router.route('/:courseId').post(protect,allowedTo('instructor'),createCoupon)
router.route('/').get(getCoupon)

module.exports=router