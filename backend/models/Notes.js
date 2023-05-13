const mongoose = require('mongoose');
//use the schema here
const { Schema } = mongoose; 
// schema of notes table
const NotesSchema = new Schema({
    user:{
        //used as foreign id here
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    tag:{
        type: String,
        required: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  module.exports = mongoose.model('notes',NotesSchema);