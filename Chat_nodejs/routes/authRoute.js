const express=require('express')
const {login,signup}=require('../services/authService')
const router=express.Router()
router.route('/login').post(login)
router.route('/signup').post(signup)

module.exports=router