const express=require("express");
const connect =require("./configs/db");

const userController=require("./controllers/user.controller")
const todoController=require("./controllers/todo.controller")
const {register,login}=require("./controllers/auth.controller")
const app=express();
app.use(express.json());

app.use("/user",userController)


app.post("/register",register)
app.post("/login",login)

 app.use("/todo",todoController)


app.listen(2299,async()=>{
    try{
        await connect();
        console.log("lisenting to port 2299")
    }
    catch(err){
        console.log(err.message);
    }
})