const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'name is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    role:{
        type:String,
        enum:["employee","manager","admin"],
    },

},{timestamps:true})

userSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,12)
})

module.exports=mongoose.model('user',userSchema)