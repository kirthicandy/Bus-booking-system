const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  Bus_name: {
    type: String,
    required: true,
  },

  Bus_number: {
    type: Number,
    required: true,
  },

  Bus_Type: {
    type: String,
    required: true,
  },
  Available_seats: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("businfo", busSchema);
