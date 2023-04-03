const express = require("express");
const router = express.Router();
const booking = require("../model/booking");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const detail = await booking.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.post("/", async (req, res) => {
  const { bus_id, user_id, Name, Age, Gender, Boarding_point,Dropping_point,No_of_seats,Booked_seats,Total_price } =
    req.body;

  try {
    await booking.create({
        bus_id,
        user_id,
        Name,
        Age,
        Gender,
        Boarding_point,
        Dropping_point,
        No_of_seats,
        Booked_seats,
        Total_price
        
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error",message:error});
    console.log(error)
   
  }
});

module.exports = router;
