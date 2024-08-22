const router=require('express').Router()

const {protect,allowedTo}=require('../services/userService')
const {addCustomer,paymentOfExpenses}=require('../services/customerservice')

router.route('/').post(protect,allowedTo('employee','admin','manager'),addCustomer)
router.route('/paymentOfExpenses/:customerId').put(protect,allowedTo('employee','admin','manager'),paymentOfExpenses)

module.exports=router