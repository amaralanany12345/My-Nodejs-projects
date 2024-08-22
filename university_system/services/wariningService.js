const warningModel=require('../models/warningModel')
const subjectsModel=require('../models/subjectsModel')
const attendanceModel = require('../models/attendanceModel')
const apiError = require('../general/apiError')

exports.getStudentWarning=async(req,res,next)=>{
    const warnings=await warningModel.find({student:req.user._id})
    res.status(201).json({data:warnings})
}
