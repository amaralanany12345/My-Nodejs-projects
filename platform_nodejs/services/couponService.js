const copounModel=require('../models/copounModel')
const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
const apiError=require('../utils/apiError')
const courseModel = require('../models/courseModel')

exports.createCoupon=async(req,res,next)=>{
    let token
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next (new apiError('token is invalid',404))
    }
    const decoded=jwt.verify(token,"abcdef")
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }

    const course=await courseModel.findById(req.params.courseId)
    if(course.instructor.toString()!=currentUser._id.toString()){
        return next (new apiError('you are not allowed to add coupon to this course',404))
    }

    const coupon=await copounModel.create({
        name:req.body.name,
        discount:req.body.discount,
        expire:req.body.expire,
        course:course._id
    })

    res.status(201).json({data:coupon})
}

exports.getCoupon=async(req,res,next)=>{
    const coupon=await copounModel.findOne(req.body.coupon)
    if(!coupon){
        return next (new apiError('coupon is not found',404))
    }
    res.status(200).json({data:coupon})
}