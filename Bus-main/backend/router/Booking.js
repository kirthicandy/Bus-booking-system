const express = require("express");
const router = express.Router();
const booking = require("../model/booking");
const busroute = require("../model/busroute");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const detail = await booking.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});
router.post("/mybook", async (req, res) => {
  const{user_id}=req.body
try {
  const detail = await booking.find({user_id});
  res.json(detail);
} catch (err) {
  res.send("Error" + err);
}
});

router.post("/", async (req, res) => {
  const {   bus_id,
    user_id,
    particularbus_id,
    passenger_detail,
    boarding_point,
    dropping_point,
    no_of_seats,
    booked_seats,
    total_price } =
    req.body;

  try {
    await booking.create({
        bus_id,
        user_id,
        passenger_detail,
        age,
        gender,
        boarding_point,
        dropping_point,
        no_of_seats,
        booked_seats,
        total_price
        
    }).then(async()=>{
      await busroute.findByIdAndUpdate({_id:particularbus_id},{$push:{reserved_seat:booked_seats}})

    })
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error",message:error});
    console.log(error)
   
  }
});

module.exports = router;
