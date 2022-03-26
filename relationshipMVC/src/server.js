const app=require("./index")
const connectDb=require("./configs/db")


app.listen(2040,async()=>{
    try{
        await connectDb();
        console.log("listening on port 2040")
     }
   catch(err){
       console.log(err.message)
   }
   
})
