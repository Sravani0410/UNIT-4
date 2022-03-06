
const express=require("express")
const app=express();
//const json=require("./app.json")
app.get("/home",(req,res)=>{
    console.log("home")
    return res.send("Hello")
})

app.get("/books",(req,res)=>{
   console.log("books")
   //return res.send(json)
   return res.send({
    "books":[
        {"id":"1",
        "title":"HarryPotter",
        "author":"J.K.Rowling"
    },
    
    {"id":"2",
        "title":"Game of thornes",
        "author":"George R. R. Martin"
     },
     {"id":"3",
        "title":"The Lord of the Rings",
        "author":"J. R. R. Tolkien"
    },
     {"id":"4",
       "title":"THE DIARY OF ANNE FRANK",
        "author":"Anne Frank"
    }
]  
})
});

app.listen(3000,()=>{
    console.log("lisening to 3000 port")


})