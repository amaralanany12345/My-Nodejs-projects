const router=require('express').Router()

const {protect,allowedTo}=require('../services/userService')
const {addCategory}=require('../services/categoryService')

router.route('/').post(protect,allowedTo('employee','admin','manager'),addCategory)

module.exports=router