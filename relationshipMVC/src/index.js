const express=require("express")  //this is the main file for express so this is in index.js

const  usersController=require("./controllers/user.controllers")
const  postsController=require("./controllers/post.controllers")
const  commentsController=require("./controllers/comment.controllers")

const app=express() //we wre intilizing the express

app.use(express.json())//this will happened in router handler in middleware and it is express related middleware


//here we are using other type of middleware
app.use("/users",usersController); //here /users are route then it meets the method i.e.,usersController
app.use("/posts",postsController);
app.use("/comments",commentsController);


module.exports=app;
//CRUD Operations:-->these are route handlers it will be in controllers part
//get-->getting data
//post-->adding data to server
//put/patch-->updating data
//delete-->deleting data

