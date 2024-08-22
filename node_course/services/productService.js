const productModel=require('../models/productModel')
const apiError=require('../general/apiError')
const apiFeatures = require('../general/apiFeatures')
const handlers=require('./handlers')
// disc: product 
// route: get /api/v1/categories
// acess: private
   exports.getAllProducts = handlers.getAll(productModel)
  
  // disc: get specific product 
  // route: get /api/v1/categories/:id
  // acess: private
  
  exports.getSpecificProduct =handlers.getSpecificOne(productModel)
  
  // disc: create product 
  // route: post /api/v1/categories
  // acess: private
  
  exports.createProduct= handlers.createMethod(productModel)
    
  // disc:  update product 
  // route: post /api/v1/categories
  // acess: private
  
  exports.updateProduct =handlers.updateMethod(productModel)
  
  // disc:  delete specific product 
  // route: delete /api/v1/categories
  // access: private
  
  exports.deleteProduct = handlers.deleteMethod(productModel);
  // async (req,res,next)=>{
    // const {id}=req.params
    // const product = await productModel.findByIdAndDelete(id)
    // if(!product){
    //     next(new apiError("product is not found",404))
    // }
    // res.status(204)