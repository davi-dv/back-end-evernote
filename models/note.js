const mongoose = require('mongoose')

//criaa schema das nota no banco
let notSchema = new mongoose.Schema({
    title:String,
    body:String,
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now},
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

modules.exports = mongoose.model('Note',notSchema);

