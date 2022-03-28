const express=require("express");
const router=express.Router()
const authenticate=require("../middlewares/authenticate")
const Todo=require("../models/todo.models")
router.post("",authenticate,async(req,res)=>{
req.body.user_id=req.user._id;
    
    try{
        const todo=await Todo.create(req.body)
        return res.status(200).send(todo)
    }
  catch(err){
      return res.status(400).send({message:err.message})
  }
})
router.get("",async(req,res)=>{
    try{
        const todo=await Todo.find()
        return res.status(200).send(todo)
    }
    catch(err){
        return res.status(400).send({message:err.message})
    }
})
router.post("",async(req,res)=>{
    try{
        const todo=await Todo.create(req.body)
        return res.status(200).send(todo)
    }
    catch(err){
        return res.status(400).send({message:err.message})
    }
})
router.patch("/todo/:id",async(req,res)=>{
    try{
        const todo=await Todo.findByIdAndUpdate(req.params.id,req,body,{new:true})
        return res.status(200).send(todo)
    }
    catch(err){
        return res.status(400).send({message:err.message})
    }
})
router.delete("/todo/:id",async(req,res)=>{
    try{
        const todo=await Todo.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send(todo)
    }
    catch(err){
        return res.status(400).send({message:err.message})
    }
})
module.exports=router;