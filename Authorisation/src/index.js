const express=require("express");
const connect =require("./configs/db");

const userController=require("./controllers/user.controller")
const productController=require("./controllers/product.controller")
const {register,login,generateToken}=require("./controllers/auth.controller")
const app=express();
const passport=require("./configs/google_oauth")



app.use(express.json());

app.use("/users",userController)
app.post("/register",register)
app.post("/login",login)
app.use("/products",productController)

 app.get('/auth/google',
 passport.authenticate('google', { scope: ['profile','email'] }));

app.get(
    '/auth/google/callback', 
 passport.authenticate('google', { failureRedirect: '/login',session:false }),
 function(req, res) {
   const token = generateToken(req.user)
    console.log(req.user,token)
   return res.status(200).send({user:req.user,token})
 });

 
app.listen(2255,async ()=>{
    try{
        await connect();
        console.log("lisenting on port 2255")
    }
    catch(err){
        console.log(err.message);
    }
});
