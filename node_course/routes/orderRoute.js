const express=require('express')
const {createCashOrder,checkOutSession} = require('../services/orderService')
const authService = require('../services/authService')

const router=express.Router()
router.use(authService.protect,authService.allowedTo('user'))

router.route('/:cartId').post(createCashOrder)
router.get('/checkout-session/:cartId',authService.protect,authService.allowedTo('user'),checkOutSession)
module.exports=router;