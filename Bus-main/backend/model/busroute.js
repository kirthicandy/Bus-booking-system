const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  bus_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },

  destination: {
    type: String,
    required: true,
  },

  arrival_time: {
    type: Date,
    required: true,
  },
  available_Seat:{
    type: String,

  },
  reserved_seat:{
    type: String,
  },
  departure_time: {
    type: Date,
    required: true,
  },
  boarding_point: {
    type: Array,
    required: true,
  }, 
  dropping_point: {
    type: Array,
    required: true,
  },
 
});

module.exports = mongoose.model("busroute", busSchema);
