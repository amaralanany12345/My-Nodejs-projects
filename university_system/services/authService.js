const userModel=require('../models/userModel')
const semesterModel=require('../models/semesterModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const apiError = require('../general/apiError')

exports.registerUser=async(req,res,next)=>{
    const user=await userModel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    })
    if(user.role=='student'){
        const semester=await semesterModel.create({
            academicYear:1,
            semesterNumber:1,
            student:user._id
        })
    }
    const token=jwt.sign({userId:user._id},'abcdef',{expiresIn:'90d'})
    res.status(200).json({data:user,token})
}

exports.signup=async(req,res,next)=>{
    const user=await userModel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
    })
    const token=jwt.sign({userId:user._id},"abcdef",{expiresIn:'90d'})

    res.status(201).json({data:user,token})
}

exports.signin=async(req,res,next)=>{
    const user=await userModel.findOne({email:req.body.email})
    if(!user || !(await bcrypt.compare(req.body.password,user.password))){
        return next (new apiError('invalid user',404))
    }
    const token=jwt.sign({userId:user._id},"abcdef",{expiresIn:'90d'})
    res.status(201).json({data:user,token})
}

exports.protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next (new apiError('token is invalid',404))
    }
    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    req.user=currentUser
    next()
}

exports.allowedTo=(...roles)=>
    async(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next (new apiError('you are not allowed to access this route',404))
        }
        next()
    }
