const mongoose=require('mongoose')

const dbConnection=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/chat',{})
}
module.exports=dbConnection