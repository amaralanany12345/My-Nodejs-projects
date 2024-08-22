const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:[6,'too short password']
    },
    image:String,
    passswordChangedAt:Date,
    role:{
        type:String,
        default:'user',
        enum:['user','admin']
    },
    followers:[{
        follower:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    }],
    following:[{
        followed:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    }],

},{timestamps:true})

module.exports=mongoose.model('user',userSchema)