const post=(model)=> async(req,res)=>{
  try{
    const item=await model.create(req.body)
    return res.status(201).send(item)
  }
  catch(err){
    console.log(err);
    return res.status(500).send({message:err.message})
  }
}
   
const deleteOne=(model)=>async(req,res)=>{
  try{
     
    const item=await model.findByIdAndDelete(req.params.id,req.body).lean().exec()
  
    return res.status(200).send({item})  
  }
    catch(err){
      console.log(err);
      return res.send(500).send({message:err.message})
    }
}

  //  module.exports=(model)=>{
  //    return{
  //       post:post(model),
  //       deleteOne:deleteOne(model)
  //    }
  //  }

  //or
  module.exports={
    // post:post,
    // deleteOne:deleteOne,
    //or
    post,
    deleteOne,
  }
