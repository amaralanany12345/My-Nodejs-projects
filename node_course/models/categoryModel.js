const mongoose = require('mongoose');

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        requires:[true,"category required"],
        unique:[true,'category must be unique'],
        minLength:[3,'min length is 3 '],
        maxLength:[32,'max length is 32 '],
    },
    slug:{
        type:String,
        lowercase:true
    },
    image:String

},{timestamps:true})

categorySchema.post('init',(doc)=>{
    if(doc.image){
        const imageURL=`http://localhost:1111/categories/${doc.image}`
        doc.image=imageURL
    }
})

categorySchema.post('save',(doc)=>{
    if(doc.image){
        const imageURL=`http://localhost:1111/categories/${doc.image}`
        doc.image=imageURL
    }
})
const CategoryModel=mongoose.model("category",categorySchema)

module.exports=CategoryModel