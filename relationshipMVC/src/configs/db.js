const mongoose=require("mongoose") //this is nothing to do with express it doen't belongs to index.js

//connect-->this is nothing to do express it is just telling how mongoose to connect mongodb
const connectDb=()=>{  //it does't belong index.js
    return mongoose.connect(
        "mongodb://127.0.0.1:27017/express_relationship"
    );
};
module.exports=connectDb