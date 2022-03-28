const express=require("express");
const router=express.Router()
const authenticate=require("../middlewares/authenticate")
const Todo=require("../models/todo.models")
router.post("",authenticate,async(req,res)=>{
req.body.user_id=req.user._id;
    
    try{
        const product=await Todo.create(req.body)
        return res.status(200).send(product)
    }
  catch(err){
      return res.status(400).send({message:err.message})
  }
})
router.get("",async(req,res)=>{
    try{
        const product=await Todo.find()
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message:err.message})
    }
})
module.exports=router;