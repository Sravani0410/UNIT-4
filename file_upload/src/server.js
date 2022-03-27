const app=require("./index")

const connect=require("./configs/db")

app.listen(3388,async()=>{
    
    try{
        await connect()
console.log("lisening to 3388")
    }
    catch(err){
        console.error(err.message)
    }
})