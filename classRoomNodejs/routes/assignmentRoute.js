const router=require("express").Router()
const multer=require('multer')
const dest=multer({dest:'uploads/assignmnets'})

const {protect,allowedTo}=require('../services/authService')
const {addAssignment,taskDelievery,uploadTask,addDegreeToAssignment}=require('../services/assignmentService')

router.route('/:classRoomId').post(protect,allowedTo('instructor'),addAssignment)
router.route('/taskDelievery/:assignmentId').put(protect,allowedTo('student'),uploadTask,taskDelievery)
router.route('/addDegreeToAssignment/:assignmentId').put(protect,allowedTo('instructor'),addDegreeToAssignment)
module.exports=router