const mongoose = require('mongoose');
//use the schema here
const { Schema } = mongoose;
// schema of users table
const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  const User =mongoose.model('users',UserSchema)
//   User.createIndexes();
  module.exports =User