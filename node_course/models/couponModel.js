const mongoose=require("mongoose")
const { trim } = require("validator")

const couponSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'coupon is required'],
        unique:true
    },
    expire:{
        type:Date,
        required:[true,'expire is required'],
    },
    discount:{
        type:Number,
        required:[true,'coupon discount is required'],
    }
},{timestamps:true})
module.exports=mongoose.model('coupon',couponSchema)
