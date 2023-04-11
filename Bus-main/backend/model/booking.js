const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  bus_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "businfo",
    required:true
  },
  busroute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "busroute",
    required: true,
  },
 user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "info",
    required:true
  },
  
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
 

  boarding_point: {
    type: String,
   
  }, 
  dropping_point: {
    type: String,
    
  }, 
  no_of_seats: {
    type: String,
    
  }, 
  booked_seats: {
    type: Array,
    
  },
   total_price: {
    type: String,
  
  },
});

module.exports = mongoose.model("booking", bookingSchema);
