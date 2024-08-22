const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const { trim, isLowercase } = require('validator')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'name is required']
    },
    slug:{
        type:String,
        lowercase:true
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:true,
    },
    phone:String,
    image:String,
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:[6,'too short password'],
    },
    passswordChangedAt:Date,
    role:{
        type:String,
        enum:['user','admin','manager'],
        default:'user',
    },
    active:{
        type:Boolean,
        default:true,
    }
}
,
{timestamps:true}
)

userSchema.pre("save", async function(next){
   
    this.password= await bcrypt.hash(this.password,12)
     next()
})

const userModel=mongoose.model('user',userSchema)
module.exports=userModel

