const productModel=require('../models/productModel')
const categoryModel = require('../models/categoryModel')
const customerCartModel = require('../models/customerCartModel')
const apiError=require('../general/apiError')

exports.addProduct=async(req,res,next)=>{
    const product=await productModel.create({
        name:req.body.name,
        price:req.body.price,
        stock:req.body.stock,
        category:req.params.categoryId,
    })
    const updatedCategory=await categoryModel.findByIdAndUpdate({_id:req.params.categoryId},{$push:{products:{product:product._id}}},{new:true})

    res.status(201).json({data:product})
}

exports.buyProducts=async(req,res,next)=>{
    const product=await productModel.findById(req.params.productId)
    if(!product){
        return next (new apiError('product is not found',404))
    }
    
}