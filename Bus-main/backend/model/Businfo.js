const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const busSchema = new mongoose.Schema({
    _id:{
        type:  mongoose.Schema.Types.ObjectId, auto: true ,

    },
    Bus_id:{
        type:String,
        required: true

    },
    Bus_name: {
        type: String,
        required: true
    },
    
   
    Bus_number: {
        type: Number,
        required: true
    },
    

    Bus_Type:{
        type:String,
        required:true
    },  
    Available_seats:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    }
    
    

   
    
   
})

module.exports = mongoose.model('businfo', busSchema)
