const {check}=require('express-validator')

const validationMiddleWare=require('../../middleWare/validatorsMiddleWare')

exports.getCategoryValidator=[
    check('id').isMongoId().withMessage(`invalid category id`),
    validationMiddleWare,
]

exports.updateCategoryValidator=[
    check('id').isMongoId().withMessage(`invalid category id`),
    validationMiddleWare,
]

exports.deleteCategoryValidator=[
    check('id').isMongoId().withMessage(`invalid category id`),
    validationMiddleWare,
]

exports.createCategoryValidator=[
    check('name').notEmpty().withMessage('category required')
    .isLength({min:3}).withMessage('too short category name')
    .isLength({max:32}).withMessage('too long category name'),
    validationMiddleWare
]

