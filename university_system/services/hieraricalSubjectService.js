const apiError = require('../general/apiError')
const hieraricalSubjectModel=require('../models/hieraricalSubjectModel')
const subjectsModel = require('../models/subjectsModel')

exports.addTopSubject=async(req,res,next)=>{
    const topSubject=await hieraricalSubjectModel.create({
        topSubject:req.body.topSubject,
    })
    res.status(201).json({data:topSubject})
}

exports.addTreeOfSubject=async(req,res,next)=>{
    const hieraricalSubject=await hieraricalSubjectModel.findOneAndUpdate({topSubject:req.params.topSubject},{$push:{treeOfSubject:{subject:req.body.subject}}},{new:true}).populate({path:'topSubject',select:'name +_id'})
    if(!hieraricalSubject){
        return next (new apiError('subject is not found',404))
    }
    const subject=await subjectsModel.findByIdAndUpdate({_id:req.body.subject},{hieraricalSubject:req.params.topSubject},{new:true})
    if(!subject){
        return next (new apiError('subject is not found',404))
    }
    res.status(200).json({data:hieraricalSubject})
}