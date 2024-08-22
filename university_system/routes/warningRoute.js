const router=require('express').Router()
const {protect,allowedTo}=require('../services/authService')
const {getStudentWarning}=require('../services/wariningService')
router.route('/').get(protect,allowedTo('student'),getStudentWarning)
module.exports=router