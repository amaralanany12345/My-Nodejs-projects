const attendanceModel=require('../models/attendanceModel')
const warningModel=require('../models/warningModel')
const subjectsModel=require('../models/subjectsModel')
const apiError=require('../general/apiError')

exports.addAttendance=async(req,res,next)=>{
    const attendance=await attendanceModel.findOne({doctor:req.user._id,subject:req.params.subjectId})
    if(!attendance){
        return next (new apiError('attendance is not found',404))
    }
    const updatedAttendance=await attendanceModel.findOneAndUpdate({doctor:req.user._id,subject:req.params.subjectId},{numOfAttendance:++attendance.numOfAttendance},{new:true}).populate({path:'student',select:'name +_id'})
    if((updatedAttendance.numOfAttendance%3==0)&&(updatedAttendance.numOfAttendance>0)){
        const warning=await warningModel.create({
            warining:req.body.warining,
            date:Date.now(),
            student:updatedAttendance.student,
            subject:updatedAttendance.subject,

        })
    }
    const warnings=await warningModel.find({student:updatedAttendance.student})
    console.log(warnings.length)
    if(warnings.length>=3){
        const subject=await subjectsModel.findOneAndUpdate({_id:updatedAttendance.subject},{$push:{studentsBlockedFromExam:{student:updatedAttendance.student}}},{new:true})
    }
    res.status(200).json({data:updatedAttendance})
}

exports.getStudentAttendance=async(req,res,next)=>{
    const attendances=await attendanceModel.find({student:req.user._id}).populate({path:'subject',select:'name +_id'})
    res.status(200).json({data:attendances})
}
