const mongoose=require("mongoose")

//COMMENT SCHEMA
//step1:creating the schema
const commentSchema=new mongoose.Schema({
    body:{type:String,required:true},
   userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
   postId:{type:mongoose.Schema.Types.ObjectId,ref:"post",required:true}
   },
   {
     versionKey:false,
     timestamps:true,
   })
   //step2:creating the model
   //const Comment=mongoose.model("comment",commentSchema)
   //module.exports=Comment
   //or we can write direct exports
   module.exports=mongoose.model("comment",commentSchema)

   