
const mongoose=require("mongoose")
//POST SCHEMA
//step1:creating the schema
const postSchema=new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user",required:true}
},
{
  versionKey:false,
  timestamps:true    //it shows 2 timestamp i.e.,createdAt and updatedAt
})

//step2:creating the model
const Post=mongoose.model("post",postSchema) //It basically tells your mongoose that whatever operation  does it has to do the post collection and the structure of the data only postSchema data can allow

module.exports=Post