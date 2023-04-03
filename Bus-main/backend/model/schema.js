const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
    _id:{
        type:  mongoose.Schema.Types.ObjectId, auto: true ,

    },
    username: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    
    gender: {
        type: String,
        required: true
    },
    userType:{
        type:String,
        required:true
    },
    age: {
        type: String,
        required: true
    },
    
   
})

module.exports = mongoose.model('info', programSchema)
