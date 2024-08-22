const router=require('express').Router()
const {protect,allowedTo}=require('../services/authService')
const {addClassWork,getStudentClassWork}=require('../services/classWorkService')
router.route('/addClassWork/:subjectId').put(protect,allowedTo('doctor'),addClassWork)
router.route('/getStudentClassWork').get(protect,allowedTo('student'),getStudentClassWork)
module.exports=router
