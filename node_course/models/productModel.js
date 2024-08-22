const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"product required"],
        minLength:[3,'min length is 3 '],
        maxLength:[100,'max length is 100 '],
    },
    slug:{
        type:String,
        required:true,
        lowercase:true,
    },
    discription:{
        type:String,
        required:[true,"product discription required"],
        minLength:[3,'min length is 3 '],
    },
    quantity:{
        type:Number,
        required:[true,'product qnt is required'],
    },
    sold:{
        type:Number,
        default:0,
    },
    price:{
        type:Number,
        required:[true,'product price is required'],
        trim:true,
        max:[2000,'too long product price']
    },
    priceAfterDiscount:{
        type:Number,
    },
    colors:[String],
    imageCover:{
        type:String,
        required:[true,'product image cover is required'],
    },
    images:[String],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required:[true,'product must be belong to category']
    },
    subCategory:[{
        type:mongoose.Schema.ObjectId,
        ref:'subCategory',
    }],
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'brand',
    },
    ratingsAvg:{
        type:Number,
        min:[1,'rating must be above or equal 1'],
        max:[5,'rating must be above or equal 1'],
    },
    ratingsQuantities:{
        type:Number,
        default:0,
    }
},
{timestamps:true}
)

productSchema.pre(/`find/,function(next){
    this.populate({path:'category',select:"name -_id"})
})
module.exports=mongoose.model('product',productSchema)