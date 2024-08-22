const router=require('express').Router()
const {protect} =require('../services/authService')

const {addToWatchLater,getUserWatchLater}=require('../services/watchLaterService')

router.route('/getUserWatchLater').get(protect,getUserWatchLater)
router.route('/addToWatchLater/:watchLaterId').put(protect,addToWatchLater)
module.exports=router
