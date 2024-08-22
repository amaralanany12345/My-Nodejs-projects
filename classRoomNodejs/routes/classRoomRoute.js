const router=require("express").Router()
const multer=require('multer')
const dest=multer({dest:'uploads/works'})

const {protect,allowedTo}=require('../services/authService')
const {createClassRoom,joinToClass,addWrok,uploadWorkFile,getClassRoomAssignments,getClassRoomStudents,getLossesAssignment,}=require('../services/classRoomService')
router.route('/').post(protect,allowedTo('instructor'),createClassRoom).put(protect,allowedTo('student'),joinToClass)
router.route('/classRoomAssignments/:classRoomId').get(protect,allowedTo('instructor'),getClassRoomAssignments)
router.route('/getClassRoomStudents/:classRoomId').get(protect,allowedTo('instructor'),getClassRoomStudents)
router.route('/addWork/:classRoomId').put(protect,allowedTo('instructor'),uploadWorkFile,addWrok)
router.route('/getLossesAssignment/:classRoomId').get(protect,allowedTo('student'),uploadWorkFile,getLossesAssignment)
module.exports=router