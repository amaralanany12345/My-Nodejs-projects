const mongoose=require('mongoose')

const subCategoryModel=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:[true,"subcategory must be unique"],
        minLength:[2,'too short sub category name'],
        maxLength:[32,'too long sub category name'],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required:[true,'SubCategory must be belong to parent category'],
    }
}
,
{
    timestamps:true
})

module.exports=mongoose.model('subCategory',subCategoryModel)
