const CategoryModel=require('../models/categoryModel')
const apiError=require('../general/apiError')
const apiFeatures=require('../general/apiFeatures')
const handlers=require('./handlers')
const multer=require('multer')
// const sharp=require('sharp')
const {v4:uuidv4}=require('uuid')
const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/categories')
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split("/")[1]
        const filename=`category-${uuidv4()}-${Date.now()}.${ext}`
        cb(null,filename)
    }
})

const multerFilter = function(req,file,cb){
    const ext=file.mimetype.split("/")[1]
    const filename=`category-${uuidv4()}-${Date.now()}.${ext}`
    console.log(ext)
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }
    else {
        cb(new apiError('only image allowed',400))
    }
    req.body.image=filename
}

const upload=multer({storage:multerStorage,fileFilter:multerFilter})

exports.uploadCategoryImage=upload.single('image')

exports.getCategories = handlers.getAll(CategoryModel)
// disc: get specific category 
// route: get /api/v1/categories/:id
// acess: private
   
exports.getSpecificCategory =handlers.getSpecificOne(CategoryModel)

// disc: create category 
// route: post /api/v1/categories
// acess: private

exports.createCategories= handlers.createMethod(CategoryModel)

// disc:  update category 
// route: post /api/v1/categories
// acess: private

exports.updateCategory=handlers.updateMethod(CategoryModel)

// disc:  delete specific category 
// route: delete /api/v1/categories
// acess: private

exports.deleteCategory =handlers.deleteMethod(CategoryModel)