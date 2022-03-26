const app =require("./index")
const connect=require("./configs/db")
app.listen(7799,async(req,res)=>{
    try{
        await connect()
        console.log("lisenting to port 7799")
    }
    catch(err){
      console.log({message:err.meassge})
    }
})