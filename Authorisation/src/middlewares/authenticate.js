require('dotenv').config()
const jwt=require("jsonwebtoken")

const verifyToken=(token)=>{
    return new Promise((resolve,reject)=>{
        var decodedResult = jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err) {
                return reject(err)
            }
            return resolve(decoded);
        } );
    })
  
}

const authenticate=async(req,res,next)=>{
if(!req.headers.authorization){
    return res.status(400).send({message:"Authorization token not found or incorrect"})
}
if(!req.headers.authorization.startsWith("Bearer ")){
    return res.status(400).send({message:"Authorization token not found or incorrect"})
}
const token =req.headers.authorization.trim().split(" ")[1]

let decoded;

try{
 decoded=await verifyToken(token) // here decoded is global scope
}
catch(err){
console.log(err)
return res.status(400).send({message:"Authorization token not found or incorrect"})
}
// console.log("decoded goes below")
// console.log(decoded)

req.user=decoded.user
//or
//req.userID=decoded.user._id;
return next();
}
module.exports= authenticate