const express=require("express") 
const User=require("../models/user.models")
const crudController=require("./crud.controller")
const router=express.Router();
//USERS CRUD
router.get("",async(req,res)=>{
    try{
       const users=await User.find().lean().exec()  //.lean converts mongoose object into json object, .exac is for whenever we are using user.find it doesn't return proper promise it return half promise so we use .exac to proper promise because we don't know .find() is not last one if may .sort() or .linit() or skip() we don'y know where it ill end so we use exac()
       console.log("users")
       return res.status(200).send({users:users})  
    }
    catch(err){
      console.log("err")
     return res.status(500).send({message:"Something went wrong..try again later "})
    }
  });
  
  //app.post("",crudController(User).post)
  //or
  router.post("",crudController.post(User))
  
  router.get("/:id",async(req,res)=>{
    try{
      console.log(req.params);
     const user=await User.findById(req.params.id).lean().exec()
     return res.status(200).send({user:user})
  
    }
    catch(err){
      console.log("err")
      return res.status(500).send({message:err.message})
    }
  });
  
  router.patch("/:id",async(req,res)=>{
    try{
     
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{
      new:true
    }).lean().exec()
    return res.status(200).send({user:user})  
  }
    catch(err){
      console.log(err);
      return res.send(500).send({message:err.message})
    }
  });
 // app.delete("/:id",crudController(User).deleteOne)
   //or
   router.delete("/:id",crudController.deleteOne(User))
  module.exports=router