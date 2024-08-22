const {check,body}=require('express-validator')
const slugify=require('slugify')
const bcrypt=require('bcryptjs')
const userModel=require('../../models/userModel')

const validationMiddleWare=require('../../middleWare/validatorsMiddleWare')

exports.signUpValidator=[
    check('name').notEmpty().withMessage('User required')
    .isLength({min:2}).withMessage('too short User name')
    .isLength({max:32}).withMessage('too long User name')
    .custom((val,{req})=>{
        req.body.slugify=slugify(val)
        return true
    }),

    check('email').notEmpty().withMessage('User required')
    .isEmail().withMessage('invalid eamil address')
    .custom((val)=> userModel.findOne({email:val}).then((user)=>{
        if(user){
            return Promise.reject(new Error('email is already exist'))
        }
    })
    
    ),
    check('password').notEmpty().withMessage('required password')
    .isLength({min:6}).withMessage('password must be 6 at least')
    .custom((password,{req})=>{
        if(password!=req.body.passwordConfirm){
            throw new Error('password confirmation is incorrect')
        }
        return true;
    }),
    check('passwordConfirm').notEmpty().withMessage('rpassword confirmation is required'),
    validationMiddleWare
]

exports.loginValidator=[
    // check('name').notEmpty().withMessage('User required')
    // .isLength({min:2}).withMessage('too short User name')
    // .isLength({max:32}).withMessage('too long User name')
    // .custom((val,{req})=>{
    //     req.body.slugify=slugify(val)
    //     return true
    // }),

    check('email').notEmpty().withMessage('User required')
    .isEmail().withMessage('invalid eamil address'),

    check('password').notEmpty().withMessage('required password')
    .isLength({min:6}).withMessage('password must be 6 at least'),
    validationMiddleWare
]

