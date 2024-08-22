const express=require('express')
const router=express.Router()
const multer=require('multer')
const dest=multer({dest:'uploads/course'})

const {addCourse,getAllCourses,getInstructorCourses,getCourse,addVideoToCourse,uploadVideo,buyCourse,getCourseStudents}=require('../services/courseService')
// const {addCourseValidator}=require('../utils/validators/courseValidator')
const {protect,allowedTo}=require('../services/authService')

router.route('/').post(protect,allowedTo('instructor'),addCourse).get(getAllCourses)
router.route('/instructorCourses').get(protect,allowedTo('instructor'),getInstructorCourses)
router.route('/:courseId').get(getCourse)
router.route('/uploadVideo/:courseId').put(protect,allowedTo('instructor'),uploadVideo,addVideoToCourse)
router.route('/getCourseStudents/:courseId').get(protect,allowedTo('instructor'),getCourseStudents)
module.exports=router