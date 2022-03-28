

const authorise=(permittedRoles)=>{
    return (req,res,next)=>{
        console.log(req.user.role)
       const user=req.user
       let isPermitted=false;
      
       permittedRoles.map(role =>{
        if(user.role.includes(role)){
           isPermitted=true 
        }
       })
       if(isPermitted){
        return next()
       }
       else{
           res.status(401).send({message:"you are not able authroise to change"})
       }
       
    }
}
module.exports=authorise

