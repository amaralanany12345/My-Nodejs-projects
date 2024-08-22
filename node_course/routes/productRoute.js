const express=require('express')
const {getAllProducts,getSpecificProduct,createProduct,updateProduct,deleteProduct} = require('../services/productService')

const router=express.Router()

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getSpecificProduct).put(updateProduct).delete(deleteProduct)
module.exports=router;