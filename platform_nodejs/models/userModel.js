const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'email must be unique']
    },
    password:{
        type:String,
        required:[true,'password is required'],
        unique:[true,'password must be unique'],
        minLength:[6,'too short password']
    },
    role:{
        type:String,
        enum:['admin','instructor','student'],
        default:'instructor'
    }


},{timestamps:true})

userSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,12)
})

module.exports=mongoose.model('user',userSchema)