const path=require('path')
const multer=require("multer")//-->this is the package


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname,"../uploads"));
    },
    filename: function (req, file,callback) {
      console.log(file)
      const uniquePrefix = Date.now();
      callback(null,uniquePrefix+ '-' + file.originalname)
    }
  });
  const fileFilter=(req, file,  callback)=> {
    console.log({file})
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  
  
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/png"){
  // To accept the file pass `true`, like so:
  callback(null, true)
  
    }
    else{
        // To reject this file pass `false`, like so:
      callback(new Error("Incorrect mime type"), false)
    }
  
  }
  
 
const options={
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize: 1024 *1024 *5  //5mb = 1mb*5  -->1mb= 1024kb so 1kb=1024bytes

    }
}
const uploads=multer(options);
  //error handling concept-->through middleware
  const single=({formKey})=>{   //here formkey is profilePic
    return  function(req,res,next){
      const uploadedItem=uploads.single({formKey});
      return uploadedItem(req,res,function(err){
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
       return res.status(500).send({message:err.message})
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.status(501).send({message:err.message})
        }
        // req.filePath=req.file.path;
        return next();
        // Everything went fine.
      })
    }
  }

  const multiple=({formKey})=>{
    return function(req,res,next){
     const uploadedItems=uploads.any("profilePic")
     return uploadedItems(req,res,function(err){
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
     return res.status(500).send({message:err.message})
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(501).send({message:err.message})
      }
      // req.filePath=req.file.path;
      return next();
      // Everything went fine.
    })
    }
  }

module.exports={single,multiple};

//1kb=1024bytes
//1mb=1024kb