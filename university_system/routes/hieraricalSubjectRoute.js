const router=require('express').Router()
const {protect,allowedTo}=require('../services/authService')
const {addTopSubject,addTreeOfSubject}=require('../services/hieraricalSubjectService')
router.route('/').post(protect,allowedTo('doctor'),addTopSubject)
router.route('/addTreeOfSubject/:topSubject').put(protect,allowedTo('doctor'),addTreeOfSubject)
module.exports=router
