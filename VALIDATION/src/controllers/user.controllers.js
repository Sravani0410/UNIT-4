const express=require("express")

const { body, validationResult } = require('express-validator');
const User=require("../models/user.models")
const router=express.Router()

router.post("/",
//here after "." we are using so many things like trim,not,isEmpty-->there are called method change
body('firstName')
    .trim()  // in first name we provide he space if we didn't trim then it show validation because it is string of length space also count as length so to overcome this we use .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("first name cannot be empty")
    .isLength({min:2,max:50})  //here length should be validation
    .withMessage("first name must be atleast 2 characters"), 
body("lastName")    
.custom(async(value)=>{
    if(value && value.length<4){
      throw new Error("Last name if provided must be at least 4 characters")
    }
    return true
}),
body("email")
    .isEmail()
    .custom(async(value)=>{  //here value output of value(i.e.,abc@gmail.com) of email
      const user=await User.findOne({email:value})
      if(user){
        throw new Error('Email is already taken');
      }
      return value
     }),
body("age")
    .not()
    .isEmpty()
    .withMessage("age cannot be empty")
    .isNumeric() //here age can accept in string format "100" or 100
    .withMessage("age must be number between 1 to 150")
    .custom(async(value)=>{
      if(value<1 || value>150){
        throw new Error("Incorrect age provided")
      }
      return true
    }),
body("pincode")
  .not()
  .isEmpty()
  .withMessage("pincode cannot be empty")
  .isNumeric()
  .withMessage("pincode must be between")
  .isLength({min:6,max:6})
  .custom(async(value)=>{
     if(value.length<1  || value.length>6 ){
       throw new Error("invalid pincode")
     }
     return true
  }),  
body("password")
    .not()
    .isEmpty()
    .withMessage("password cannot be empty")
    .custom(async(value)=>{
      const passw= /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
      if(!value.match(passw)) 
      { 
        throw new Error("password must be strong")
      }
      return true
    }),
    // .custom(async(value,{req})=>{
    //     if(value!==req.body.confirmPassword){
    //     throw new Error("Password and confirmPassword should be matched")
    //     }
    //     return true
    // }),
  body("gender")
  .not()
  .isEmpty()
  .withMessage("gender cannot be empty")
  .custom(async(value)=>{
    if(value !=="female" && value !=="male" && value !=="transgender"){
      throw new Error("gender should be either male,female or others")
    }
    return true
  }),
  
async(req,res)=>{
    try{
      console.log(body("firstName"))
       const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user=await User.create(req.body)
      // const user=await User.create({
      //   firstName:req.body.firstName,
      //   email:req.body.email,
      //   password:req.body.password,
      //   age:req.body.age,
      //   gender:req.body.gender,
      //   pincode:req.body.pincode
      // })
      return res.status(201).send(user)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})


module.exports=router