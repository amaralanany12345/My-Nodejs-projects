const express=require('express')
const multer=require('multer')
const upload=multer({dest:'uploads/categories'})
const {getCategoryValidator,updateCategoryValidator,deleteCategoryValidator,createCategoryValidator}=require('../general/validators/categoryValidator')
const subCategoryRoute=require('./subCategoryRoute')
const {getCategories,getSpecificCategory,createCategories,updateCategory,deleteCategory,uploadCategoryImage} = require('../services/categoryService')
const authService=require('../services/authService')
const router=express.Router()

router.use('/:categoryId/subCategories',subCategoryRoute)

router.route('/').get(getCategories).post(
    authService.protect,
    authService.allowedTo('admin','manager'),
    uploadCategoryImage,
createCategoryValidator,createCategories)
router.route('/:id')
.get(getCategoryValidator,getSpecificCategory)
.put(updateCategoryValidator,updateCategory)
.delete(deleteCategoryValidator,deleteCategory)

module.exports=router;