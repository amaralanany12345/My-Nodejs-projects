const router=require('express').Router()
const {protect,allowedTo}=require('../services/authService')
const {addSubject,registerToSubject,getStudentSubject}=require('../services/subjectService')
router.route('/').post(protect,allowedTo('doctor'),addSubject)
router.route('/registerToSubject/:subjectId').put(protect,allowedTo('student'),registerToSubject)
router.route('/getStudentSubject').get(protect,allowedTo('student'),getStudentSubject)
module.exports=router
