const brandModel=require('../models/brandModel')
const apiError=require('../general/apiError')
const apiFeatures=require('../general/apiFeatures')
const handlers=require('./handlers')

// disc: brand 
// route: get /api/v1/categories
// acess: private
exports.getBrand = handlers.getAll(brandModel)

// disc: get specific brand 
// route: get /api/v1/categories/:id
// acess: private

exports.getSpecificBrand = handlers.getSpecificOne(brandModel)

// disc: create brand 
// route: post /api/v1/categories
// acess: private

exports.createBrand= handlers.createMethod(brandModel)


// disc:  update brand 
// route: post /api/v1/categories
// acess: private

exports.updateBrand = handlers.updateMethod(brandModel)

// disc:  delete specific brand 
// route: delete /api/v1/categories
// acess: private

exports.deleteBrand = handlers.deleteMethod(brandModel)