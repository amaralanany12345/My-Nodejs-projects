const mongoose=require('mongoose')

const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name of customer is required'],
    },
    phone:{
        type:String,
        required:[true,'phone of customer is required'],
    },
    deserved:{
        type:Number,
        default:0
    },
    paid:{
        type:Number,
        date:Date,
        default:0
    },
    remaining:{
        type:Number,
        default:0,
    }
},{timestamps:true})

module.exports=mongoose.model('customer',customerSchema)