const express=require('express')
const {getAllUsers,getSpecificUser,createUser,updateUser,deleteUser,changeUserPassword} = require('../services/userService')
const {getUserValidator,updateUserValidator,deleteUserValidator,createUserValidator,changePasswordValidators}=require('../general/validators/userValidator')

const router=express.Router()

router.route('/').get(getAllUsers).post(createUserValidator,createUser)
router.route('/:id')
.get(getUserValidator,getSpecificUser)
.put(updateUserValidator,updateUser)
.delete(deleteUserValidator,deleteUser)

router.put("/changePassword/:id",changePasswordValidators,changeUserPassword)
module.exports=router;