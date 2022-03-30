const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect(
        "mongodb+srv://Sravani:Sandhya@cluster0.u6uyg.mongodb.net/mySecondDatabase?retryWrites=true&w=majority"
    );
};

module.exports = connect;



