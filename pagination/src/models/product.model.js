const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    sellerEmail:{type:String,required:true},
    product_image_url:{type:String,required:true},
},{
    timestamps:true,
    versionKey:false
})
const Product=mongoose.model("products",productSchema)
module.exports=Product