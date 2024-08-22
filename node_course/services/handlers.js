const productModel=require('../models/productModel')
const apiError=require('../general/apiError')
const apiFeatures = require('../general/apiFeatures')

exports.deleteMethod=(model)=>
    async (req,res,next)=>{

        const {id}=req.params
        const document = await model.findByIdAndDelete(id)
        if(!document){
            next(new apiError(`${document} is not found`,404))
        }
        res.status(204)
}

exports.updateMethod=(model)=>
async (req,res,next)=>{
    if(req.body.title){
    }
    const document=await model.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
    if(!document){
      return next(new apiError(`${document} is not found`,404))
    }
    res.status(200).json({data:document})
}

exports.createMethod=(model)=>
    async(req,res,next)=>{

        const document =await model.create(req.body)

        res.status(201).json({data:document})
}

exports.getSpecificOne= (model)=>
    async(req,res,next)=>{
        const {id}=req.params
        const document= await model.findById(id)
        if(!document){
           return next(new apiError(`${document} is not found`,404))
        }
        res.status(200).json({data:document})
    }

exports.getAll=(model)=>

async (req,res,next)=>{
        let filter= {}
        if(req.filterObj){
            filter=req.filterObj
        }
        const counts=await model.countDocuments()
        const apiFeature= new apiFeatures(req.query,model.find(filter)).filter().search(model).filedLimit().sort().paginate(counts)

        const {mongooseQuery,paginationResult}=apiFeature
         const allDocuments = await mongooseQuery
         res.status(201).json({data:allDocuments,results:allDocuments.length})
}

exports.getLoggedUser=()=>{
    async(req,res,next)=>{
        let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
        // next();
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }

    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    return currentUser;
    }
}
