const subjectModel=require('../models/subjectsModel')
const attendanceModel=require('../models/attendanceModel')
const apiError=require('../general/apiError')
const classWorkModel = require('../models/classWorkModel')

exports.addClassWork=async(req,res,next)=>{
    const subject=await subjectModel.findById(req.params.subjectId)
    if(!subject){
        return next (new apiError('subject is not found',404))
    }
    
    const index=subject.students.findIndex((item)=>item.user.toString()==req.body.student)
    const studentClassWork=await classWorkModel.findOneAndUpdate({subject:req.params.subjectId,student:req.body.student},{classWork:req.body.classWork},{new:true})
    
    if(studentClassWork.classWork<subject.score/2){
        studentClassWork.state='fail'
        await studentClassWork.save()
    }

    else if(studentClassWork.classWork>=subject.score/2 && studentClassWork.classWork<subject.score*0.65){
        studentClassWork.state='D'
        await studentClassWork.save()
    }

    else if(studentClassWork.classWork<subject.score*0.75 && studentClassWork.classWork>=subject.score*0.65){
        studentClassWork.state='C'
        await studentClassWork.save()
    }
    
    else if(studentClassWork.classWork<subject.score*0.85 && studentClassWork.classWork>=subject.score*0.75){
        studentClassWork.state='B'
        await studentClassWork.save()
    }
    
    else if(studentClassWork.classWork<subject.score && studentClassWork.classWork>=subject.score*0.85){
        studentClassWork.state='A'
        await studentClassWork.save()
    }
    subject.students[index].classWork=studentClassWork._id
    await subject.save()
    res.status(200).json({data:studentClassWork})
}

exports.getStudentClassWork=async(req,res,next)=>{
    
    let studentClasswork=[]

    const subject=await subjectModel.find({})
    for(let i=0;i<subject.length;i++){
        for(let j=0;j<subject[i].students.length;j++){
            if(subject[i].students[j].user.toString()==req.user._id.toString()){
                studentClasswork.push(await classWorkModel.findById(subject[i].classWorks[j].classWork).populate({path:'subject',select:'name +_id'}).populate({path:'student',select:'name +_id'}))
            }
        }
    }
    res.status(200).json({data:studentClasswork})
}