const apiError=require('../general/apiError')
const userModel = require('../models/userModel')
const jwt=require('jsonwebtoken')

exports.createOne = (model)=> async(req,res,next)=>{
    const document=await model.create(req.body)
    res.status(201).json({data:document})
}

exports.deleteOne=(model)=> async(req,res,next)=>{
    const document=await model.findByIdAndDelete(req.params.id)

    if(!document){
        return next (new apiError(`${document} is not found`),404)
    }

    res.status(204).json('deleted')
}

exports.updateOne=(model)=> async(req,res,next)=>{
    const document=await model.findByIdAndUpdate(req.params.id,req.body,{new:true})

    if(!document){
        return next (new apiError(`${document} is not found`),404)
    }

    res.status(200).json({data:document})
}

exports.getSpecificOne=(model) => async(req,res,next)=>{
    const document=await model.findById(req.params.id)

    if(!document){
        return next (new apiError(`${document} is not found`),404)
    }

    res.status(200).json({data:document})
}

exports.getAll=(model)=> async(req,res,next)=>{
    const document=await model.find({})
    res.status(201).json({data:document})
}
