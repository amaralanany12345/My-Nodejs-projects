const express=require('express')
const {addCart,getUserCart,removeSpecificCartItem,clearCart,updateCartItemQuantity,applyCoupon} = require('../services/cartService')
const authService = require('../services/authService')
const router=express.Router()
router.use(authService.protect,authService.allowedTo('user'))
router.route('/').post(addCart).get(getUserCart).delete(clearCart)
router.put('/applyCoupon',applyCoupon)
router.route('/:itemId').put(updateCartItemQuantity).delete(removeSpecificCartItem)
module.exports=router;