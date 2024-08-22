const express=require('express')
const {signUp,login} = require('../services/authService')
const {signUpValidator,loginValidator}=require('../general/validators/authValidator')

const router=express.Router()

router.route('/signup').post(signUpValidator,signUp)
router.route('/login').post(loginValidator,login)
// router.route('/:id')
// .get(getUserValidator,getSpecificUser)
// .put(updateUserValidator,updateUser)
// .delete(deleteUserValidator,deleteUser)

// router.put("/changePassword/:id",changePasswordValidators,changeUserPassword)
module.exports=router;