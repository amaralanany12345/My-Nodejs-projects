const mongoose = require('mongoose');

const brandSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"brand required"],
        unique:[true,'brand must be unique'],
        minLength:[3,'min length is 3 '],
        maxLength:[32,'max length is 32 '],
    },
    slug:{
        type:String,
        lowercase:true
    },
    image:String

},{timestamps:true})

const brandModel=mongoose.model("brand",brandSchema)

module.exports=brandModel