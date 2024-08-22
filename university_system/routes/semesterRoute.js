const router=require('express').Router()
const {protect,allowedTo}=require('../services/authService')
const {updateStudentAcademicYear}=require('../services/semesterService')
router.route('/').put(protect,allowedTo('doctor'),updateStudentAcademicYear)

module.exports=router
