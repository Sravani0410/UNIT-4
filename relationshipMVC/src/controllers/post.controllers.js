const express=require("express") 
const Post=require("../models/post.models")
const Comment=require("../models/comment.models")
const crudController=require("./crud.controller")
const router=express.Router();
//POSTS CRUD

app.get("",async(req,res)=>{
    try{
     const posts=await Post.find().populate({path:"userId",select:{firstName: 1,email:1,_id: 0}}).lean().exec()
     return res.status(200).send(posts)
      
    }
      catch(err){
        console.log(err);
        return res.send(500).send({message:err.message})
      }
  
  })
  //app.post("",crudController(Post).post)
  //or
  routerrouter.post("",crudController.post(Post))
 
  
  router.get("/:id",async(req,res)=>{
    try{
      const post=await Post.findById(req.params.id).populate({path:"userId",select:["email"]}).lean().exec()
      return res.status(200).send({post:post})
    }
    catch(err){
      console.log(err)
      return res.status(500).send({message:err.message})
    }
  })
  
  router.patch("/:id",async(req,res)=>{
    try{
      const post=await Post.findByIdAndUpdate(req.params.id,req.body,{
        new:true
      }).populate({path:"userId",select:["firstName"]}).lean().exec()
      return res.status(200).send({posts:post})
    }
    catch(err){
      console.log(err);
      return res.status(500).send({message:err.message})
    }
  });
  //app.delete("/:id",crudController(Post).deleteOne)
  //or
  app.delete("/:id",crudController.deleteOne(Post))

  router.get("/:postId/comments",async(req,res)=>{
    try{
      const comments=await Comment.find({postId:req.params.postId}).
      lean().exec()
      return res.status(200).send(comments)
       
     }
       catch(err){
         console.log(err);
         return res.send(500).send({message:err.message})
       }
   
  })
  module.exports=router