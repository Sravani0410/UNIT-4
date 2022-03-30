const mongoose=require("mongoose")

const skinSchema=mongoose.Schema({
    url:{type:String,required:true},
    rating:{type:Number,required:true},
    heading:{type:String,required:true},
    price:{type:Number,required:true},
    strikedprice:{type:Number},
    use:{type:String,required:true},
    ingredients:{type:String,required:true}
})
const Skin =mongoose.model("skin",skinSchema)
module.exports=Skin;