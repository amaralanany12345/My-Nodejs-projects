const semesterModel=require('../models/semesterModel')
const apiError=require('../general/apiError')
const classWorkModel=require('../models/classWorkModel')
const subjectsModel=require('../models/subjectsModel')

exports.updateStudentAcademicYear=async(req,res,next)=>{
    const classWork=await classWorkModel.find({student:req.body.student})
    let studentTotal =0
    let totalWork=0
    let workState=[]
    let studentSubjects=[]
    for(let i=0;i<classWork.length;i++){
        studentSubjects.push(await subjectsModel.findById({_id:classWork[i].subject}))
        studentTotal+=classWork[i].classWork
        workState.push(classWork[i].state)
    }
    for(let i=0;i<studentSubjects.length;i++){
        totalWork+=studentSubjects[i].score
    }
    const semester=await semesterModel.findOne({student:req.body.student})
    if(workState.includes('fail') || studentTotal<totalWork/2){
        return next (new apiError('you are failed this year',404))
    }
    if(studentTotal>=totalWork/2){
        semester.semesterNumber++
        if(semester.semesterNumber>2){
            semester.academicYear++
            semester.semesterNumber=1
        }
        if(semester.academicYear>4){
            return next (new apiError('you are complete your academic career',404))
        }
        semester.subjects=[]
        await semester.save()
    }
    res.status(200).json({data:semester})
}
