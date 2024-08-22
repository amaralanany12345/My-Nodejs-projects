const mongoose=require('mongoose')

const dpConnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/social',{})
}

module.exports=dpConnection