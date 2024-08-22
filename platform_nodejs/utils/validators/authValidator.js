const validatorMiddleWare=require('../../middelWare/validatorsMiddleWare')

const {check}=require('express-validator')
const userModel=require('../../models/userModel')
const apiError = require('../apiError')

exports.signupValidators=[
    check('name').notEmpty().withMessage('name is required'),
    check('email').notEmpty().withMessage('email is required').isEmail().withMessage('not valid email'),
    check('password').notEmpty().withMessage('password is required').isLength({min:6}).withMessage('too short password')
   .custom((val)=> userModel.findOne({email:val}).then((user)=>{
        if(user){
            return next (new apiError('this enail is signed before',404))   
        }
   })),
    validatorMiddleWare
]

exports.loginValidators=[
    check('email').notEmpty().withMessage('email is required').isEmail().withMessage('not valid email'),
    check('password').notEmpty().withMessage('password is required').isLength({min:6}).withMessage('too short password'),
    validatorMiddleWare,

]