const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    phone:{
        type:String,
        required:[true,'phone is required'],
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    friends:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    }],
    image:String,
    role:{
        type:String,
        enum:['normal','admin'],
        default:'normal'
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,12)
    next()
})

module.exports=mongoose.model('user',userSchema)