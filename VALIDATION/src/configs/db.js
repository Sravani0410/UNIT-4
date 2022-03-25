const mongoose=require("mongoose");
// const connect=()=>{
//     return mongoose.connect("mongodb://localhost:27017/Authentication",{
//         // userNew
//     })
// }
module.exports=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/validation")
}