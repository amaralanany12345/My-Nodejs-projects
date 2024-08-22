const {check}=require('express-validator')

const validationMiddleWare=require('../../middleWare/validatorsMiddleWare')

exports.getSubCategoryValidator=[
    check('id').isMongoId().withMessage(`invalid Subcategory id`),
    validationMiddleWare,
]

exports.updateSubCategoryValidator=[
    check('id').isMongoId().withMessage(`invalid Subcategory id`),
    validationMiddleWare,
]

exports.deleteSubCategoryValidator=[
    check('id').isMongoId().withMessage(`invalid Subcategory id`),
    validationMiddleWare,
]

exports.createSubCategoryValidator=[
    check('name').notEmpty().withMessage('Subcategory required')
    .isLength({min:2}).withMessage('too short Subcategory name')
    .isLength({max:32}).withMessage('too long Subcategory name'),
    check('category').notEmpty().withMessage('sub category must belong to category')
    .isMongoId().withMessage('invalid category id'),
    validationMiddleWare
]

