const couponModel=require('../models/couponModel')
const apiError=require('../general/apiError')
const apiFeatures=require('../general/apiFeatures')
const handlers=require('./handlers')

// disc: coupon 
// route: get /api/v1/categories
// acess: private
exports.getCoupon = handlers.getAll(couponModel)

// disc: get specific coupon 
// route: get /api/v1/categories/:id
// acess: private

exports.getSpecificCoupon = handlers.getSpecificOne(couponModel)

// disc: create coupon 
// route: post /api/v1/categories
// acess: private

exports.createCoupon= handlers.createMethod(couponModel)


// disc:  update coupon 
// route: post /api/v1/categories
// acess: private

exports.updateCoupon = handlers.updateMethod(couponModel)

// disc:  delete specific coupon 
// route: delete /api/v1/categories
// acess: private

exports.deleteCoupon = handlers.deleteMethod(couponModel)