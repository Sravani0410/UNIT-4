const express=require("express");
const router=express.Router()
const authenticate=require("../middlewares/authenticate")
const authorise=require("../middlewares/authorise")
const Product=require("../models/product.models")
//puropse of middleware authentication is check if token is present,then  if token is present take token is correct.then if token is correct give back th user details
router.post("",authenticate,async(req,res)=>{
    //console.log(req)
    
    req.body.user_id=req.user._id;
    //or
    //req.body.user_id=req.userID;
    try{
        const product=await Product.create(req.body)
        return res.status(200).send(product)
    }
  catch(err){
      return res.status(400).send({message:err.message})
  }
});
router.patch("/:id",authenticate,authorise(["admin","seller"]),async(req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message:err.message})
    }
})



router.get("",async(req,res)=>{
    try{
        const product=await Product.find()
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message:err.message})
    }
})
module.exports=router;