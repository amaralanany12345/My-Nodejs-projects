const productModel=require('../models/productModel')
const apiError=require('../general/apiError')
const categoryModel = require('../models/categoryModel')

exports.addCategory=async(req,res,next)=>{
    const category=await categoryModel.create({
        name:req.body.name,
    })    
    res.status(201).json({data:category})
}

