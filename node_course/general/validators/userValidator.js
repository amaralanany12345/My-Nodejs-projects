const {check,body}=require('express-validator')
const slugify=require('slugify')
const bcrypt=require('bcryptjs')
const userModel=require('../../models/userModel')

const validationMiddleWare=require('../../middleWare/validatorsMiddleWare')

exports.getUserValidator=[
    check('id').isMongoId().withMessage(`invalid User id`),
    validationMiddleWare,
]

exports.updateUserValidator=[
    check('id').isMongoId().withMessage(`invalid User id`),
    validationMiddleWare,
]

exports.deleteUserValidator=[
    check('id').isMongoId().withMessage(`invalid User id`),
    validationMiddleWare,
]

exports.createUserValidator=[
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
    check('phone').isMobilePhone("ar-EG").withMessage('not valid egyptian number').notEmpty().withMessage('phone is required'),
    validationMiddleWare
]

exports.changePasswordValidators=[
    check('id').isMongoId().withMessage(`invalid User id`),
    body('currentPassword').notEmpty().withMessage('current password is required'),
    body('passwordConfirm').notEmpty().withMessage('password confirm is required'),
    body('password').notEmpty().withMessage('password is required').custom(async (val,{req})=>{
        const user=await userModel.findById(req.params.id)
        if(!user){
            throw new Error('there is no user for this id')
        }
        // last updated password is the current password
        // the new updated password is the password
        
        const isCorrrectPassword=await bcrypt.compare(req.body.currentPassword,user.password)

        if(!isCorrrectPassword){
            throw new Error('not correct password')
        }

            if(val!=req.body.passwordConfirm){
                throw new Error('password confirmation is incorrect')
            }
            return true;
    }),
    validationMiddleWare

]

