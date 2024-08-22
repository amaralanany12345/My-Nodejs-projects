const apiError=require('../general/apiError')
const userModel=require('../models/userModel')
const assignmentModel=require('../models/assignmentModel')
const classRoomModel=require('../models/classRoomModel')
const jwt=require('jsonwebtoken')
const multer=require('multer')
const {v4:uuidv4}=require('uuid')

const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/assignmnets')
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split("/")[1]
        const filename=`assignment-${uuidv4()}-${Date.now()}.${ext}`
        cb(null,filename)
        req.file=filename
    }
})
const upload=multer({storage:multerStorage})
exports.uploadTask=upload.single('taskDelievered')

exports.taskDelievery=async(req,res,next)=>{
   const assignment=await assignmentModel.findById({_id:req.params.assignmentId,deadline:{$lt:Date.now()}})
    let penalty=false
    if(assignment.deadline<Date.now()){
        penalty=true
    }
    else {
        penalty=false
    }
    const assignmentUploaded=await assignmentModel.findByIdAndUpdate({_id:req.params.assignmentId},{$push:{studentsComplete:{student:req.user._id,taskDelievered:req.file,date:Date.now(),penalty:penalty}}},{new:true})
    res.status(201).json({data:assignmentUploaded})

}

exports.addAssignment=async(req,res,next)=>{
    const classRoom=await classRoomModel.findOne({instructor:req.user._id,_id:req.params.classRoomId})
    if(!classRoom){
        return next (new apiError('class room is not found'))
    }
    const assignment=await assignmentModel.create({
        name:req.body.name,
        instructor:req.user._id,
        classRoom:classRoom._id,
        degree:req.body.degree,
        deadline:req.body.deadline
    })
    await classRoomModel.findOneAndUpdate({instructor:req.user._id,_id:req.params.classRoomId},{$push:{assignments:{assignment:assignment._id}}},{new:true})
    res.status(201).json({data:assignment})
}

exports.addDegreeToAssignment=async(req,res,next)=>{
    const assignment=await assignmentModel.findById(req.params.assignmentId)
    let studentCompleteTheAssignment;
    for(let i=0;i<assignment.studentsComplete.length;i++){
        if(assignment.studentsComplete[i].student.toString()==req.body.studentId.toString()){
            studentCompleteTheAssignment=assignment.studentsComplete[i]
        }
    }
    studentCompleteTheAssignment.degree=10;
    await assignment.save()
    res.status(200).json({data:assignment})
}
