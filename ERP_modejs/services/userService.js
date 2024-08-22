const userModel=require('../models/userModel')
const apiError=require('../general/apiError')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

exports.createUser=async(req,res,next)=>{
    const user=await userModel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
    })

    res.status(201).json({data:user})
}

exports.signin=async(req,res,next)=>{
    const user=await userModel.findOne({email:req.body.email})

    if(!user || !(await bcrypt.compare(req.body.password,user.password))){
        return next (new apiError('user is not found',404))
    }

    const token=jwt.sign({userId:user._id},"abcdef",{expiresIn:'90d'})
    res.status(200).json({data:user,token})
}

exports.protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return next (new apiError('token is invalid',404))
    }

    const decoded=jwt.verify(token,"abcdef")
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }
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
    