const subCategoryModel=require('../models/subCategoryModel')
const apiError=require('../general/apiError')
const handlers=require('./handlers')

exports.setCategoryById= (req,res,next)=>{
    if(!req.body.category){
        req.body.category=req.params.categoryId
    }
    next()
}

exports.getAllSubCategory=async (req,res)=>{
    const page=req.query.page*1
    const limit=req.query.limit
    const skip=(page-1)*limit

    let filterObject={}
    if (req.params.categoryId){
        filterObject={category:req.params.categoryId}
    }

    const allSubCategories=await subCategoryModel.find({category:req.params.categoryId}).skip(skip).limit(limit).populate({path:'category',select:'name'})

    res.status(200).json({result:allSubCategories.length,page,data:allSubCategories})
}

exports.getSpecificSubCategory= handlers.getSpecificOne(subCategoryModel)

exports.createSubCategory=handlers.createMethod(subCategoryModel)

exports.updateSubCategory= handlers.updateMethod(subCategoryModel)

exports.deleteSubCategory= handlers.deleteMethod(subCategoryModel)