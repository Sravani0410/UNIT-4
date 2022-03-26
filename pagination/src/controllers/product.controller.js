const path=require('path')//-->core module comes with node it required path
const express=require("express");

const transporter=require("../configs/mail")
const Product = require("../models/product.model")

const router=express.Router()

router.get("/",async(req,res)=>{
    try{
      const page=req.query.page || 1
      const pagesize=req.query.pagesize || 10 //30
      const skip=(page-1)*pagesize

  const product=await Product.find()
  .skip(skip)  //0  30
  .limit(pagesize)  //1-30  31-60
  .lean()
  .exec()

  const totalPages= Math.ceil((await Product.find().countDocuments())/pagesize)
  return res.status(200).send({product,totalPages});
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
});

router.post("/",async(req,res)=>{
  try{
    const product=await Product.create(req.body);

 // console.log(path.join(__dirname,"../product.created.mail.html"))
 transporter.sendMail({
      from: '"Amazon admin" <admin@amazon.com>', // sender address
      to:product.sellerEmail, // list of receivers
      subject: "your product is successfully created", // Subject line
      text: "Hello sir/madam your product is successfully uploaded", // plain text body
      //html: "<b>Hello sir/madam your product is successfully uploaded</b>", // html body
      alternatives: [
        {
            contentType: 'text/html',
            path:path.join(__dirname,"../mailers/product-created.mail.html")
        },
        {
          filename:"product-details.txt",
          path:path.join(__dirname,"../mailers/product-details.txt")
        }
    ]
    });
  return res.status(201).send({message:"Product created successfully"})
  }
  catch(err){

  }
  
 
})


module.exports=router