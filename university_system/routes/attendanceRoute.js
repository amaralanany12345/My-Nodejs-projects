const router=require('express').Router()
const {protect,allowedTo}=require('../services/authService')
const {addAttendance,getStudentAttendance}=require('../services/attendanceService')
router.route('/addAttendance/:subjectId').put(protect,allowedTo('doctor'),addAttendance)
router.route('/getStudentAttendance').get(protect,allowedTo('student'),getStudentAttendance)
module.exports=router