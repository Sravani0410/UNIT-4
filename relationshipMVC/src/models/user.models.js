//here we want mongoose also
const mongoose=require("mongoose")
//schema
//USER SCHEMA-->business logic it is inside src in model
//step1:creating the schema
const userSchema=new mongoose.Schema({    // new is a new keyword of schema and here mongoose.schema is here schema is function of mongoose
    firstName:{type:String,required:true},
    lastName:{type:String,required:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},{
  versionKey:false,
  timestamps:true
})
//step2:creating the model
//user => users
const User=mongoose.model("user",userSchema)   //this user is creste the new collection
module.exports=User;