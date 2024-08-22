const router=require('express').Router()

const {protect,allowedTo}=require('../services/userService')
const {addProduct}=require('../services/productService')

router.route('/:categoryId').post(protect,allowedTo('employee','admin','manager'),addProduct)

module.exports=router