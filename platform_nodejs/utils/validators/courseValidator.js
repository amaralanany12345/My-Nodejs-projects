const {check}=require('express-validator')
const courseModel=require('../../models/courseModel')
const validatorMiddleWare=require('../../middelWare/validatorsMiddleWare')
const apiError = require('../apiError')

exports.addCourseValidator=[
    check('name').notEmpty().withMessage('name of the course is required'),
    check('description').notEmpty().withMessage('description of the course is required')
    .isLength({min:6}).withMessage('too short description of the course'),
    validatorMiddleWare()
]