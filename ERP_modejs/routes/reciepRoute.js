const router=require('express').Router()

const {protect,allowedTo}=require('../services/userService')
const {paymentOfReciep}=require('../services/reciepService')

router.route('/:reciepId').put(protect,allowedTo('employee','admin','manager'),paymentOfReciep)

module.exports=router