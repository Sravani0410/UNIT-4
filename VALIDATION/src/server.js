//const path=require("path")
const app=require("./index");
//const connect=require("../../express-realtionships/src/configs/db")--->to connect different folder here to run same server
const connect=require("./configs/db")
app.listen(2266,async function(){
try{
await connect();
console.log("Listening on port 2266")
}
catch(err){
    console.log(err.message);
}
})