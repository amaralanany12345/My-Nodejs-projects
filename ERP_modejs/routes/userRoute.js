const router=require('express').Router()

const {createUser,signin}=require('../services/userService')

router.route('/createUser').post(createUser)
router.route('/signin').post(signin)

module.exports=router