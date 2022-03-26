const express=require("express") 

const Comment=require("../models/comment.models")
const crudController=require("./crud.controller")

const router=express.Router();

//COMMENT SCHEMA
router.get("",async(req,res)=>{
    try{
      const comments=await Comment.find()
      .populate({
        path:"postId",
        select:["title"],
        populate: {path:"userId",select:["firstName"]}  // this populate is post user details
     })
      .populate({path:"userId",select:["firstName"]})  // this populate is comment user details
      .lean().exec()
      return res.status(201).send({comment:comments})
    }
    catch(err){
      console.log(err);
      return res.status(500).send({message:err.message})
    }
   });
//app.post("",crudController(Comment).post)
//or
router.post("",crudController.post(Comment))

router.get("/:id",async(req,res)=>{
     try{
       const comment=await Comment.findById(req.params.id)
       .populate({path:"postId",select:["title","body"],populate:{path:"userId",select:["password"]}})
       .populate({path:"userId",select:["firstName"]})
       .lean().exec()
       return res.status(201).send({comment:comment})
     }
     catch(err){
       console.log(err)
       return res.status(500).send({message:err.message})
     }
   });
   router.patch("/:id",async(req,res)=>{
     try{
    const comment=await Comment.findByIdAndUpdate(req.params.id,req.body,{
      new:true
    })
    .populate({path:"postId",select:["title"],populate:{path:"userId",select:["firstName"]}})
    .populate({path:"userId",select:["firstName"]})
    .lean().exec()
    return res.status(201).send({comment:comment})
     }
     catch(err){
       console.log(err)
       return res.status(500).send({message:err.message})
     }
   })
 // app.delete("/:id",crudController(Comment).deleteOne)

  //or
  router.delete("/:id",crudController.deleteOne(Comment))

  module.exports=router