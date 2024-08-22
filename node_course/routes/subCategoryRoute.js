const express=require('express')
const {getAllSubCategory,createSubCategory,updateSubCategory,getSpecificSubCategory,deleteSubCategory,setCategoryById} = require('../services/subCategoryService')
const {getSubCategoryValidator,updateSubCategoryValidator,deleteSubCategoryValidator,createSubCategoryValidator}=require('../general/validators/subCategoryValidator')

//merge params: allow us to access paramters on other routers

// ex: we need to access  category id from category router

const router=express.Router({mergeParams:true})

router.route('/').post(setCategoryById,createSubCategoryValidator,createSubCategory).get(getAllSubCategory)
router.route('/:id').get(getSubCategoryValidator,getSpecificSubCategory).put(updateSubCategoryValidator,updateSubCategory).delete(deleteSubCategoryValidator,deleteSubCategory)

module.exports=router;