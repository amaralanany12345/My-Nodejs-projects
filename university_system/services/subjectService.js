const subjectModel=require('../models/subjectsModel')
const attendanceModel=require('../models/attendanceModel')
const apiError=require('../general/apiError')
const classWorkModel = require('../models/classWorkModel')
const semesterModel = require('../models/semesterModel')

exports.addSubject=async(req,res,next)=>{
    const subject=await subjectModel.create({
        name:req.body.name,
        doctor:req.user._id,
        score:req.body.score,
    })
    res.status(201).json({data:subject})
}

exports.registerToSubject=async(req,res,next)=>{
    const subject=await subjectModel.findById({_id:req.params.subjectId})
    if(!subject){
        return next (new apiError('subject is not found',404))
    }
    if(subject.hieraricalSubject){

        const hieraricalSubject=await subjectModel.findById(subject.hieraricalSubject.toString())
        if(!hieraricalSubject){
            return next (new apiError('hierarical subject is not found',404))
        }
        const studentState=await classWorkModel.findOne({subject:hieraricalSubject._id,student:req.user._id})
        if(studentState.state=='fail'){
            return next (new apiError('you are not allowed to register to this subject',404))
        }
    }

    const attendance=await attendanceModel.create({
        student:req.user._id,
        subject:req.params.subjectId,
        doctor:subject.doctor
    })

    const studentClassWork=await classWorkModel.create({
        student:req.user._id,
        subject:req.params.subjectId
    })

    const studentsemester=await semesterModel.findOneAndUpdate({student:req.user._id},{$push:{subjects:{subject:req.params.subjectId}}},{new:true})

    const updatedSubject=await subjectModel.findByIdAndUpdate({_id:req.params.subjectId},{$push:{students:{user:req.user._id},attendances:{attendance:attendance._id},classWorks:{classWork:studentClassWork._id}}},{new:true})
    res.status(201).json({data:updatedSubject})
}

exports.getStudentSubject=async(req,res,next)=>{
    let subjects=[]
    const subject=await subjectModel.find({})
    for(let i=0;i<subject.length;i++){
        for(let j=0;j<subject[i].students.length;j++){
            if(subject[i].students[j].user.toString()==req.user._id.toString()){
                subjects.push(await subjectModel.findById(subject[i]._id))
            }
        }
    }
    res.status(200).json({length:subjects.length,data:subjects})
}

