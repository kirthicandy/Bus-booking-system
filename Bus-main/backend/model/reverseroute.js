const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  Bus_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  Source: {
    type: String,
    required: true,
  },

  Destination: {
    type: String,
    required: true,
  },

  Arrival_time: {
    type: String,
    required: true,
  },
  Departure_time: {
    type: String,
    required: true,
  },
  Boarding_point: {
    type: Array,
    required: true,
  },
 
});

module.exports = mongoose.model("reverseroute", busSchema);
