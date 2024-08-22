const router=require('express').Router()

const {protect,allowedTo}=require('../services/userService')
const {addProductToCustomerCart,addCustomerCart,deleteItemFromcutomerCart,applyOrder}=require('../services/customerCartService')

router.route('/').post(protect,allowedTo('employee','admin','manager'),addCustomerCart)
router.route('/addProductToCustomerCart/:customerCartId').put(protect,allowedTo('employee','admin','manager'),addProductToCustomerCart)
router.route('/deleteItemFromcutomerCart/:customerCartId').put(protect,allowedTo('employee','admin','manager'),deleteItemFromcutomerCart)
router.route('/applyOrder/:customerCartId').put(protect,allowedTo('employee','admin','manager'),applyOrder)

module.exports=router