const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/iNotebook"
const connectToMongo=()=>{
    //callback function used in second parameter    
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Successfully")
    })
}
module.exports =connectToMongo