const path=require('path')
const  express=require("express")
const User=require("../models/user.models");

const {single,multiple}=require("../middlewares/uploads")
const router=express.Router();


router.get("",async(req,res)=>{
    try{
      const users=await User.find().lean().exec()
      return res.status(200).send(users)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})
router.post("",single("profilePic"),async(req,res)=>{
  try{
   // console.log(path.join(_dirname,"../uploads"))
   // console.log(req.body)
  // console.log(req.file)
  const user=await User.create({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:req.body.password,
    age:req.body.age,
    profilePic:req.file.path, // this path find when we console.log({file})
  })
  //console.log(req.file.path)
    return res.status(200).send(user)
    // const posts=await User.create(req.body)
    // return res.status(200).send(posts)
  }

  catch(err){
      return res.status(501).send({message:err.message})
  }
 
});
router.post("/multiple",multiple("profilePic"),async(req,res)=>{
  try{
    const filePaths=req.files.map((file)=>{
      //console.log({file});
      return file.path;
    })
   // console.log({filePath});
   const users=await User.create({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:req.body.password,
    age:req.body.age,
    profilePic: filePaths,
   })
   return res.status(200).send(users)
  }
 catch(err){
      return res.status(500).send({message:err.message})
  }

})
module.exports=router