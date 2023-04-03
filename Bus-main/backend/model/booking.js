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
 user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "info",
    required:true
  },

  Name: {
    type: String,
    
  },

  Age: {
    type: String,

  },
  Gender: {
    type: String,
    
  },
  Boarding_point: {
    type: Array,
   
  }, 
  Dropping_point: {
    type: Array,
    
  }, 
  No_of_seats: {
    type: Array,
    
  }, 
  Booked_seats: {
    type: Array,
    
  },
   Total_price: {
    type: String,
  
  },
});

module.exports = mongoose.model("booking", bookingSchema);
