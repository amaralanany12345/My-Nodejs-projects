const apiError=require('../utils/apiError')
const jwt=require('jsonwebtoken')
const courseModel=require('../models/courseModel')
const userModel=require('../models/userModel')
const multer=require('multer')
// const dest=multer({dest:'uploads/course'})

const {v4:uuidv4}=require('uuid')

const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/course')
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split("/")[1]
        const filename=`course-${uuidv4()}-${Date.now()}.${ext}`
        cb(null,filename)
    }
})

const multerFilter = function(req,file,cb){
    const ext=file.mimetype.split("/")[1]
    const filename=`course-${uuidv4()}-${Date.now()}.${ext}`
    console.log(file.mimetype)
    if(file.mimetype.startsWith("video")){
        console.log('ammar')
        cb(null,true)
    }
    else {
        console.log('saad')
        cb(new apiError('only video allowed',400))
    }
        req.body.video=filename
        req.file=filename
}

const upload=multer({storage:multerStorage,fileFilter:multerFilter})

exports.uploadVideo=upload.single('video')

exports.addVideoToCourse=async(req,res,next)=>{
    const course=await courseModel.findByIdAndUpdate(req.params.courseId,{$push:{videos:{video:req.file}}},{new:true})
    res.status(200).json({videosLength:course.videos.length,data:course})
}

exports.addCourse=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token =req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next (new apiError('token is invalid',404))
    }
    const decoded=jwt.verify(token,"abcdef")
    const currentUser=await userModel.findById(decoded.userId)

    if(!currentUser){
        return next (new apiError('user is not found',404))
    }

    if(currentUser.role=='instructor'){

        const course=await courseModel.create({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            instructor:currentUser._id
        })
        res.status(201).json({data:course})
    }
    else
     {
        return next (new apiError('you are not allowed to add course'))
     }
}


exports.getAllCourses=async(req,res,next)=>{
    const allCourses=await courseModel.find({}).populate({path:'instructor',select:'name +_id'})
    res.status(201).json({data:allCourses})
}

exports.getInstructorCourses=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return next (new apiError('invalid token',404))
    }

    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('iser is not found',404))
    }
    const instructorCourses=await courseModel.find({instructor:currentUser._id.toString()})
    res.status(201).json({data:instructorCourses})
}

exports.getCourse=async(req,res,next)=>{
    let students=[]
    const course=await courseModel.findById(req.params.courseId).populate({path:'instructor',select:'name +_id'})
    if(!course){
        return next (new apiError('course is not found',404))
    }
    res.status(200).json({data:course})
}

exports.getCourseStudents=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return next (new apiError('invalid token',404))
    }

    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('iser is not found',404))
    }
    const course=await courseModel.findById({_id:req.params.courseId})
    let students=[]
    for(let i=0;i<course.students.length;i++){
        students.push(await userModel.findById(course.students[i].user))
    }

    res.status(200).json({data:students})
}
