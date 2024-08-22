const express=require('express')
const {getCoupon,getSpecificCoupon,createCoupon,updateCoupon,deleteCoupon} = require('../services/couponService')
const authService=require('../services/authService')
const router=express.Router()
router.use(authService.protect)
router.route('/').get(getCoupon).post(createCoupon)
router.route('/:id').get(getSpecificCoupon).put(updateCoupon).delete(deleteCoupon)
module.exports=router;