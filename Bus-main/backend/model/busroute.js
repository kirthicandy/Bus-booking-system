const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Businfo = require("./Businfo");

const busSchema = new mongoose.Schema({
 
  bus_id: {
    ref: "businfo",

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
    type: Array
  },
  reserved_seat:{
    type: Array,
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
