const express=require("express")
const app=express();
const Books=require("./index.json")

app.get("/books",logger,(req,res)=>{
    return res.send({books:Books})
})

app.get("/books/:name",(req,res)=>{
    req.name=req.params.name
    return res.send({nameofbook:req.name})
})
function logger(req,res,next){
    console.log("Fetching all books");
    next();
}
app.listen(2500,()=>{
    console.log("Lisenting the 2500 port")
})