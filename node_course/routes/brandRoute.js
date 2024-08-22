const express=require('express')
const {getBrand,getSpecificBrand,createBrand,updateBrand,deleteBrand} = require('../services/brandService')

const router=express.Router()

router.route('/').get(getBrand).post(createBrand)
router.route('/:id').get(getSpecificBrand).put(updateBrand).delete(deleteBrand)
module.exports=router;