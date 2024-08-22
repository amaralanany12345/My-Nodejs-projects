const userModel=require('../models/userModel')
const apiError=require('../general/apiError')
const apiFeatures = require('../general/apiFeatures')
const bycrypt=require('bcryptjs')
const handlers=require('./handlers')
// disc: product 
// route: get /api/v1/categories
// acess: private
   exports.getAllUsers = handlers.getAll(userModel)
  
  // disc: get specific User 
  // route: get /api/v1/categories/:id
  // acess: private
  
  exports.getSpecificUser =handlers.getSpecificOne(userModel)
  
  // disc: create User 
  // route: post /api/v1/categories
  // acess: private
  
  exports.createUser= handlers.createMethod(userModel)
    
  // disc:  update User 
  // route: post /api/v1/categories
  // acess: private
  
//   exports.updateUser =handlers.updateMethod(userModel)

  exports.updateUser=
  
  async (req,res,next)=>{
   // if(req.body.title){
   // }
   const document=await userModel.findByIdAndUpdate(req.params.id,
      {
         name:req.body.name,
         email:req.body.email,
         phone:req.body.phone,
         slug:req.body.slug,
         rule:req.body.rule,
         
      },
      
      {new:true})
   
   if(!document){
     return next(new apiError(`${document} is not found`,404))
   }
   res.status(200).json({data:document})
}

exports.changeUserPassword= async (req,res,next)=>{

   const document=await userModel.findByIdAndUpdate(
      req.params.id,
      {password:await bycrypt.hash(req.body.password,12),
      passswordChangedAt:Date.now()},
      {new:true})
   if(!document){
      return next(new apiError(`${document} is not found`,404))
    }
    res.status(200).json({data:document})
}
  // disc:  delete specific User 
  // route: delete /api/v1/categories
  // access: private
  
  exports.deleteUser = handlers.deleteMethod(userModel);
