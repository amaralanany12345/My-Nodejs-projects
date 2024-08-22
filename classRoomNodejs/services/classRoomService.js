const apiError=require('../general/apiError')
const userModel=require('../models/userModel')
const classRoomModel=require('../models/classRoomModel')
const jwt=require("jsonwebtoken")
const multer=require('multer')
const {v4:uuidv4}=require('uuid')
const assignmentModel = require('../models/assignmentModel')

const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/works')
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split("/")[1]
        const filename=`classRoom-${uuidv4()}-${Date.now()}.${ext}`
        cb(null,filename)
        req.file=filename
    }
})

const upload=multer({storage:multerStorage})

exports.uploadWorkFile=upload.single('file')

exports.addWrok=async(req,res,next)=>{
    const classRoom=await classRoomModel.findByIdAndUpdate({_id:req.params.classRoomId},{$push:{works:{file:req.file}}},{new:true})
    if(!classRoom){
        return next (new apiError('class room is not found',404))
    }
    res.status(200).json({data:classRoom})
}

exports.createClassRoom=async(req,res,next)=>{
    const classRoom=await classRoomModel.create({
        name:req.body.name,
        instructor:req.user._id,
        code:req.body.code,
    })
    res.status(201).json({data:classRoom})
}

exports.joinToClass=async(req,res,next)=>{
    const classRoom=await classRoomModel.findOne({code:req.body.code})
    if(!classRoom){
        return next (new apiError('class room is not found',404))
    }
    const updateeClassRoom=await classRoomModel.findOneAndUpdate({code:req.body.code},{$push:{students:{student:req.user._id}}},{new:true})
    res.status(200).json({data:updateeClassRoom})
}

exports.getClassRoomAssignments=async(req,res,next)=>{
    const assignments=await assignmentModel.find({classRoom:req.params.classRoomId})
    res.status(200).json({data:assignments})
}

exports.getClassRoomStudents=async(req,res,next)=>{
    const classRoom=await classRoomModel.findById(req.params.classRoomId)
    let students=[]
    for(let i=0;i<classRoom.students.length;i++){
        students.push(await userModel.findById(classRoom.students[i].student))
    }
    res.status(200).json({data:students})
}

exports.getLossesAssignment=async(req,res,next)=>{
    const assignment=await assignmentModel.findById({_id:req.body.assignmentId,classRoom:req.params.classRoomId})
    const classRoom=await classRoomModel.findById(req.params.classRoomId)
    const index=assignment.studentsComplete.findIndex((item)=>item.student.toString()==req.user._id.toString())
        if((assignment.deadline<Date.now())&&(index<0)){
            const updatedClassRoom=await classRoomModel.findByIdAndUpdate({_id:req.params.classRoomId},{$push:{losesAssignment:{assignment:assignment._id}}},{new:true})
            res.status(200).json({data:updatedClassRoom})
        }
        res.status(200).json({data:classRoom})
}
// id =530872660243-8slfmlhll83qs9r0pump2d40qggi50q4.apps.googleusercontent.com
