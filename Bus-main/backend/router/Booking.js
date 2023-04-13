const express = require("express");
const router = express.Router();
const booking = require("../model/booking");
const busroute = require("../model/busroute");
const mongoose = require("mongoose");


router.post("/mybook", async (req, res) => {
  const{user_id}=req.body
try {
  const detail = await booking.find({user_id});
  res.json(detail);
} catch (err) {
  res.send("Error" + err);
}
});

router.put("/cancel", async (req, res) => {
  const{booking_id,busroute_id,booked_seats}=req.body
try {
  const detail = await booking.find({booking_id}).then(async()=>{
    const detail2= await busroute.findById({_id:busroute_id})
    let array =  detail2.reserved_seat.filter((item,id)=>{
     return( !booked_seats.includes(item))
     
    })
    console.log(array)
    const detail3= await busroute.findByIdAndUpdate({_id:busroute_id},{reserved_seat:array})
  });
  res.send({ status: "ok" });
  res.json(detail)
} catch (err) {
  res.send("Error" + err);
}
});

router.post("/", async (req, res) => {
  const {    bus_id,
    user_id,
    busroute_id,
    user_detail,
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
      busroute_id,
      user_detail,
      boarding_point,
      dropping_point,
      no_of_seats,
      booked_seats,
      total_price 
        
    }).then(async()=>{
      await busroute.findByIdAndUpdate({_id:busroute_id},{$push:{reserved_seat:{ $each:booked_seats}}})

    })
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error",message:error});
    console.log(error)
   
  }
});
router.get("/:id", async (req, res) => {
  try {
    const detail = await booking.find({busroute_id:req.params.id});
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});




router.get("/", async (req, res) => {
  try {
    const detail = await booking.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

module.exports = router;
